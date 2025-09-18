import matter from 'gray-matter';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface PageMetadata {
  title: string;
  subtitle?: string;
  updated: string;
}

export interface Page {
  metadata: PageMetadata;
  content: string;
  slug: string;
}

const PAGES_DIR = join(process.cwd(), 'src', 'data', 'pages');

export function loadPage(slug: string): Page | null {
  try {
    const filePath = join(PAGES_DIR, `${slug}.md`);
    if (!existsSync(filePath)) {
      return null;
    }

    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      metadata: data as PageMetadata,
      content: content.trim(),
      slug
    };
  } catch (error) {
    console.error(`Error loading page ${slug}:`, error);
    return null;
  }
}

// Simple markdown parser that returns structured data instead of JSX
export interface MarkdownElement {
  type: 'h2' | 'h3' | 'p' | 'list' | 'link' | 'spacer';
  content: string;
  href?: string;
  key: number;
  html?: string; // For formatted content
}

// Helper function to process inline formatting (bold, links)
function processInlineFormatting(text: string): string {
  // Process bold text (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Process links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-purple hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

  return text;
}

export function parseMarkdown(content: string): MarkdownElement[] {
  const lines = content.split('\n');
  const elements: MarkdownElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === '') {
      elements.push({ type: 'spacer', content: '', key: key++ });
    } else if (line.startsWith('## ')) {
      const content = line.replace('## ', '');
      elements.push({
        type: 'h2',
        content,
        html: processInlineFormatting(content),
        key: key++
      });
    } else if (line.startsWith('### ')) {
      const content = line.replace('### ', '');
      elements.push({
        type: 'h3',
        content,
        html: processInlineFormatting(content),
        key: key++
      });
    } else if (line.startsWith('- ')) {
      const content = line.replace('- ', '');
      elements.push({
        type: 'list',
        content,
        html: processInlineFormatting(content),
        key: key++
      });
    } else if (line.trim()) {
      const processedContent = processInlineFormatting(line);
      elements.push({
        type: 'p',
        content: line,
        html: processedContent,
        key: key++
      });
    }
  }

  return elements;
}