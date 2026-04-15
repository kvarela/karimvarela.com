'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  return (
    <>
      <style>{`
        .prose-matrix {
          color: rgba(204, 255, 204, 0.85);
          line-height: 1.8;
          font-size: 1rem;
        }
        .prose-matrix h1,
        .prose-matrix h2,
        .prose-matrix h3,
        .prose-matrix h4,
        .prose-matrix h5,
        .prose-matrix h6 {
          font-family: var(--font-mono), "JetBrains Mono", monospace;
          color: #ccffcc;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .prose-matrix h1 { font-size: 1.75rem; color: #00ff41; }
        .prose-matrix h2 {
          font-size: 1.375rem;
          border-bottom: 1px solid rgba(0, 255, 65, 0.2);
          padding-bottom: 0.5rem;
        }
        .prose-matrix h3 { font-size: 1.2rem; color: #80ffb2; }
        .prose-matrix p { margin-bottom: 1.25rem; }
        .prose-matrix a {
          color: #00ff41;
          text-decoration: underline;
          text-decoration-color: rgba(0, 255, 65, 0.4);
          transition: color 0.2s;
        }
        .prose-matrix a:hover {
          color: #39ff14;
          text-decoration-color: #39ff14;
        }
        .prose-matrix code:not(pre code) {
          font-family: var(--font-mono), "JetBrains Mono", monospace;
          font-size: 0.875em;
          color: #00ff41;
          background: rgba(0, 255, 65, 0.08);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 4px;
          padding: 0.15em 0.4em;
        }
        .prose-matrix pre {
          background: #0d1a0d;
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 8px;
          padding: 1.25rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
          font-family: var(--font-mono), "JetBrains Mono", monospace;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .prose-matrix pre code {
          background: transparent;
          border: none;
          padding: 0;
          font-size: inherit;
          color: #ccffcc;
        }
        .prose-matrix blockquote {
          border-left: 3px solid #00ff41;
          margin-left: 0;
          padding-left: 1rem;
          color: rgba(204, 255, 204, 0.6);
          font-style: italic;
          margin-bottom: 1.25rem;
        }
        .prose-matrix ul,
        .prose-matrix ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .prose-matrix li { margin-bottom: 0.5rem; }
        .prose-matrix li::marker { color: #00ff41; }
        .prose-matrix table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }
        .prose-matrix th,
        .prose-matrix td {
          border: 1px solid rgba(0, 255, 65, 0.15);
          padding: 0.5rem 0.75rem;
          text-align: left;
        }
        .prose-matrix th {
          background: rgba(0, 255, 65, 0.08);
          font-family: var(--font-mono), "JetBrains Mono", monospace;
          color: #00ff41;
          font-weight: 600;
        }
        .prose-matrix tr:hover { background: rgba(0, 255, 65, 0.03); }
        .prose-matrix hr {
          border: none;
          border-top: 1px solid rgba(0, 255, 65, 0.15);
          margin: 2rem 0;
        }
        .prose-matrix img {
          border-radius: 8px;
          border: 1px solid rgba(0, 255, 65, 0.15);
          max-width: 100%;
          height: auto;
        }
        .prose-matrix strong { color: #ccffcc; font-weight: bold; }
        .prose-matrix em { color: rgba(204, 255, 204, 0.8); font-style: italic; }
        /* highlight.js overrides for matrix theme */
        .prose-matrix .hljs {
          background: transparent;
          color: #ccffcc;
        }
        .prose-matrix .hljs-keyword,
        .prose-matrix .hljs-selector-tag { color: #00ff41; font-weight: bold; }
        .prose-matrix .hljs-string { color: #4dff93; }
        .prose-matrix .hljs-comment { color: rgba(0, 255, 65, 0.4); font-style: italic; }
        .prose-matrix .hljs-number { color: #80ffb2; }
        .prose-matrix .hljs-built_in { color: #1aff74; }
        .prose-matrix .hljs-title { color: #b3ffd1; }
        .prose-matrix .hljs-attr { color: #39ff14; }
      `}</style>
      <div className="prose-matrix">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  )
}
