import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIGenerateResponseDto } from './dto/ai-generate.dto'
import type { ImageGenerateResponseDto } from './dto/image-generate.dto'

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name)
  private anthropic: Anthropic | null = null
  private googleAI: GoogleGenerativeAI | null = null

  constructor(private readonly configService: ConfigService) {
    const anthropicKey = this.configService.get<string>('ANTHROPIC_API_KEY')
    const googleKey = this.configService.get<string>('GOOGLE_AI_API_KEY')

    if (anthropicKey) {
      this.anthropic = new Anthropic({ apiKey: anthropicKey })
    } else {
      this.logger.warn('ANTHROPIC_API_KEY not set — AI blog generation disabled')
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
    if (!this.anthropic) {
      throw new InternalServerErrorException('Anthropic API key not configured')
    }

    const systemPrompt = `You are a technical blog writer for Karim Varela, a software engineer.
Write engaging, informative blog posts in Markdown format.
${context ? `\nAdditional context about the author:\n${context}` : ''}

Respond with a JSON object containing exactly these fields:
- title: string (compelling blog post title, no markdown)
- content: string (full blog post in Markdown, minimum 500 words)
- excerpt: string (2-3 sentence summary, plain text, max 300 chars)
- tags: string[] (3-6 relevant lowercase tag names, e.g. ["typescript", "nestjs", "backend"])

Return only the JSON object, no surrounding text or code fences.`

    const userMessage = `Write a blog post about the following topic:\n\n${prompt}`

    this.logger.log(`Generating blog post for prompt: "${prompt.slice(0, 80)}..."`)

    let rawText: string
    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      })

      const firstBlock = response.content[0]
      if (firstBlock.type !== 'text') {
        throw new InternalServerErrorException('Unexpected response type from Anthropic API')
      }
      rawText = firstBlock.text
    } catch (err) {
      this.logger.error('Anthropic API error', err)
      throw new InternalServerErrorException('Failed to generate blog post via AI')
    }

    // Strip optional markdown code fences
    const jsonText = rawText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    let parsed: AIGenerateResponseDto
    try {
      parsed = JSON.parse(jsonText) as AIGenerateResponseDto
    } catch {
      this.logger.error('Failed to parse Anthropic response as JSON', rawText)
      throw new InternalServerErrorException('AI returned non-JSON response')
    }

    // Basic validation
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
      // Use the imagen-3.0-generate model
      // The @google/generative-ai SDK exposes imagen via getGenerativeModel
      const model = this.googleAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' })

      // generateImages is available on Imagen models but not typed in the generative-ai SDK
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
