import matter from 'gray-matter';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// Types for position data
export interface PositionMetadata {
  id: string;
  title: string;
  type: 'goal' | 'action' | 'recommendation' | 'guideline';
  status: 'draft' | 'public' | 'unpublished';
  created: string;
  updated: string;
  author: string;
  tags: string[];
  category: string;
  justification: string;
  expected_outcomes: string[];
  dependencies?: Array<{
    position_id: string;
    description: string;
  }>;
  related_positions?: string[];
  source_documents?: string[];
  ui_config?: {
    card_color: 'purple' | 'yellow' | 'gray';
    priority_level: 'high' | 'medium' | 'low';
    icon: string;
  };
  review_status?: {
    ai_generated: boolean;
    curator_approved: boolean;
    approved_by?: string;
    approved_at?: string;
  };
}

export interface Position {
  metadata: PositionMetadata;
  content: string;
  slug: string;
}

// Data directories
const DATA_DIR = join(process.cwd(), 'src', 'data');
const POSITIONS_DIR = join(DATA_DIR, 'positions');
const METADATA_DIR = join(DATA_DIR, 'metadata');

// Ensure directories exist
export function ensureDataDirectories(): void {
  const dirs = [DATA_DIR, POSITIONS_DIR, METADATA_DIR];
  dirs.forEach(dir => {
    if (!existsSync(dir)) {
      require('fs').mkdirSync(dir, { recursive: true });
    }
  });
}

// Load a single position from markdown file
export function loadPosition(id: string): Position | null {
  try {
    const filePath = join(POSITIONS_DIR, `${id}.md`);
    if (!existsSync(filePath)) {
      return null;
    }

    const fileContent = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      metadata: data as PositionMetadata,
      content: content.trim(),
      slug: id
    };
  } catch (error) {
    console.error(`Error loading position ${id}:`, error);
    return null;
  }
}

// Load all positions
export function loadAllPositions(): Position[] {
  try {
    ensureDataDirectories();

    if (!existsSync(POSITIONS_DIR)) {
      return [];
    }

    const files = readdirSync(POSITIONS_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));

    return files
      .map(id => loadPosition(id))
      .filter((position): position is Position => position !== null)
      .sort((a, b) => new Date(b.metadata.updated).getTime() - new Date(a.metadata.updated).getTime());
  } catch (error) {
    console.error('Error loading all positions:', error);
    return [];
  }
}

// Load published positions only
export async function loadPublishedPositions(): Promise<Position[]> {
  return loadAllPositions().filter(position => position.metadata.status === 'public');
}

// Save a position to markdown file
export function savePosition(position: Position): void {
  try {
    ensureDataDirectories();

    const { metadata, content } = position;
    const frontmatter = matter.stringify(content, metadata);
    const filePath = join(POSITIONS_DIR, `${metadata.id}.md`);

    writeFileSync(filePath, frontmatter, 'utf-8');
  } catch (error) {
    console.error(`Error saving position ${position.metadata.id}:`, error);
    throw error;
  }
}

// Generate search index
export interface SearchIndexEntry {
  id: string;
  title: string;
  type: string;
  status: string;
  tags: string[];
  category: string;
  content_excerpt: string;
  updated: string;
  related_positions: string[];
  search_weight: number;
}

export function generateSearchIndex(): void {
  try {
    const positions = loadPublishedPositions();

    const indexEntries: SearchIndexEntry[] = positions.map(position => ({
      id: position.metadata.id,
      title: position.metadata.title,
      type: position.metadata.type,
      status: position.metadata.status,
      tags: position.metadata.tags,
      category: position.metadata.category,
      content_excerpt: position.content.substring(0, 200) + '...',
      updated: position.metadata.updated,
      related_positions: position.metadata.related_positions || [],
      search_weight: 1.0
    }));

    const searchIndex = {
      positions: indexEntries,
      last_updated: new Date().toISOString(),
      total_positions: indexEntries.length
    };

    const indexPath = join(METADATA_DIR, 'positions-index.json');
    writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error generating search index:', error);
    throw error;
  }
}

// Load search index
export function loadSearchIndex() {
  try {
    const indexPath = join(METADATA_DIR, 'positions-index.json');
    if (!existsSync(indexPath)) {
      generateSearchIndex();
    }

    const indexContent = readFileSync(indexPath, 'utf-8');
    return JSON.parse(indexContent);
  } catch (error) {
    console.error('Error loading search index:', error);
    return { positions: [], last_updated: new Date().toISOString(), total_positions: 0 };
  }
}

// Validate position metadata
export function validatePosition(metadata: Partial<PositionMetadata>): string[] {
  const errors: string[] = [];

  if (!metadata.id) errors.push('ID is required');
  if (!metadata.title) errors.push('Title is required');
  if (!metadata.type || !['goal', 'action', 'recommendation', 'guideline'].includes(metadata.type)) {
    errors.push('Valid type is required (goal, action, recommendation, guideline)');
  }
  if (!metadata.status || !['draft', 'public', 'unpublished'].includes(metadata.status)) {
    errors.push('Valid status is required (draft, public, unpublished)');
  }
  if (!metadata.justification) errors.push('Justification is required');
  if (!metadata.category) errors.push('Category is required');
  if (!metadata.tags || !Array.isArray(metadata.tags) || metadata.tags.length === 0) {
    errors.push('At least one tag is required');
  }

  return errors;
}

// Generate unique position ID
export function generatePositionId(): string {
  const existingPositions = loadAllPositions();
  const existingIds = existingPositions.map(p => parseInt(p.metadata.id));
  const maxId = Math.max(0, ...existingIds);
  return (maxId + 1).toString().padStart(3, '0');
}