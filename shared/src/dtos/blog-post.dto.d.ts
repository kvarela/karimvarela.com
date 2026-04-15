import type { BlogPostStatus } from '../types/blog.types';
export interface CreateBlogPostDto {
    title: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
    status?: BlogPostStatus;
    tagIds?: string[];
    tagNames?: string[];
}
export interface UpdateBlogPostDto {
    title?: string;
    content?: string;
    excerpt?: string;
    coverImageUrl?: string;
    status?: BlogPostStatus;
    tagIds?: string[];
    tagNames?: string[];
}
export interface AIGenerateDto {
    prompt: string;
    context?: string;
}
export interface ImageGenerateDto {
    prompt: string;
}
//# sourceMappingURL=blog-post.dto.d.ts.map