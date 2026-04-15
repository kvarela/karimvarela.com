import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIGenerateResponseDto } from './dto/ai-generate.dto'
import type { ImageGenerateResponseDto } from './dto/image-generate.dto'

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name)
  private openai: OpenAI | null = null
  private googleAI: GoogleGenerativeAI | null = null

  constructor(private readonly configService: ConfigService) {
    const openaiKey = this.configService.get<string>('OPENAI_API_KEY')
    const googleKey = this.configService.get<string>('GOOGLE_AI_API_KEY')

    if (openaiKey) {
      this.openai = new OpenAI({ apiKey: openaiKey })
    } else {
      this.logger.warn('OPENAI_API_KEY not set — AI blog generation disabled')
    }

    if (googleKey) {
      this.googleAI = new GoogleGenerativeAI(googleKey)
    } else {
      this.logger.warn('GOOGLE_AI_API_KEY not set — image generation disabled')
    }
  }

  // ─── Blog generation ────────────────────────────────────────────────────────

  async generateBlogPost(
    prompt: string,
    context?: string,
  ): Promise<AIGenerateResponseDto> {
    if (!this.openai) {
      throw new InternalServerErrorException('OpenAI API key not configured')
    }

    const systemPrompt = `You are a technical blog writer for Karim Varela, a software engineer.
Write engaging, informative blog posts in Markdown format.
${context ? `\nAdditional context about the author:\n${context}` : ''}

Respond with a JSON object containing exactly these fields:
- title: string (compelling blog post title, no markdown)
- content: string (full blog post in Markdown, minimum 500 words)
- excerpt: string (2-3 sentence summary, plain text, max 300 chars)
- tags: string[] (3-6 relevant lowercase tag names, e.g. ["typescript", "nestjs", "backend"])`

    this.logger.log(`Generating blog post for prompt: "${prompt.slice(0, 80)}..."`)

    let parsed: AIGenerateResponseDto
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Write a blog post about the following topic:\n\n${prompt}` },
        ],
      })

      const text = response.choices[0]?.message?.content ?? ''
      parsed = JSON.parse(text) as AIGenerateResponseDto
    } catch (err) {
      this.logger.error('OpenAI API error', err)
      throw new InternalServerErrorException('Failed to generate blog post via AI')
    }

    if (!parsed.title || !parsed.content || !parsed.excerpt || !Array.isArray(parsed.tags)) {
      throw new InternalServerErrorException('AI response missing required fields')
    }

    return {
      title: parsed.title.trim(),
      content: parsed.content.trim(),
      excerpt: parsed.excerpt.trim(),
      tags: parsed.tags.map((t) => t.trim().toLowerCase()),
    }
  }

  // ─── Image generation ───────────────────────────────────────────────────────

  async generateImage(prompt: string): Promise<ImageGenerateResponseDto> {
    if (!this.googleAI) {
      throw new InternalServerErrorException('Google AI API key not configured')
    }

    this.logger.log(`Generating image for prompt: "${prompt.slice(0, 80)}..."`)

    try {
      const model = this.googleAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' })

      const result = await (model as unknown as {
        generateImages: (params: {
          prompt: string
          numberOfImages: number
          aspectRatio: string
        }) => Promise<{
          images: Array<{ imageBytes: string; mimeType: string }>
        }>
      }).generateImages({
        prompt,
        numberOfImages: 1,
        aspectRatio: '16:9',
      })

      const image = result.images[0]
      if (!image) {
        throw new InternalServerErrorException('No image returned from Imagen API')
      }

      return {
        base64: image.imageBytes,
        mimeType: image.mimeType ?? 'image/png',
      }
    } catch (err) {
      this.logger.error('Google Imagen API error', err)
      throw new InternalServerErrorException('Failed to generate image via AI')
    }
  }
}
