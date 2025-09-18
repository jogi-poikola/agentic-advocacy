import { Position } from './markdown/processor';

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  type?: string;
}

export interface SearchResult {
  position: Position;
  score: number;
  matchedFields: string[];
}

export function searchPositions(
  positions: Position[],
  filters: SearchFilters
): SearchResult[] {
  let results = positions.map(position => ({
    position,
    score: 0,
    matchedFields: [] as string[]
  }));

  // Apply query filter
  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase().trim();

    results = results.map(result => {
      let score = 0;
      const matchedFields: string[] = [];

      // Search in title (highest weight)
      if (result.position.metadata.title.toLowerCase().includes(query)) {
        score += 10;
        matchedFields.push('title');
      }

      // Search in tags (high weight)
      const matchingTags = result.position.metadata.tags.filter(tag =>
        tag.toLowerCase().includes(query)
      );
      if (matchingTags.length > 0) {
        score += 8 * matchingTags.length;
        matchedFields.push('tags');
      }

      // Search in category (medium weight)
      if (result.position.metadata.category.toLowerCase().includes(query)) {
        score += 6;
        matchedFields.push('category');
      }

      // Search in justification (medium weight)
      if (result.position.metadata.justification.toLowerCase().includes(query)) {
        score += 5;
        matchedFields.push('justification');
      }

      // Search in content (lower weight)
      if (result.position.content.toLowerCase().includes(query)) {
        score += 3;
        matchedFields.push('content');
      }

      // Search in expected outcomes
      const matchingOutcomes = result.position.metadata.expected_outcomes.filter(outcome =>
        outcome.toLowerCase().includes(query)
      );
      if (matchingOutcomes.length > 0) {
        score += 4 * matchingOutcomes.length;
        matchedFields.push('outcomes');
      }

      return {
        ...result,
        score,
        matchedFields
      };
    });

    // Filter out results with no matches
    results = results.filter(result => result.score > 0);
  }

  // Apply category filter
  if (filters.category) {
    results = results.filter(result =>
      result.position.metadata.category === filters.category
    );
  }

  // Apply tags filter
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter(result =>
      filters.tags!.some(tag =>
        result.position.metadata.tags.includes(tag)
      )
    );
  }

  // Apply type filter
  if (filters.type) {
    results = results.filter(result =>
      result.position.metadata.type === filters.type
    );
  }

  // Sort by score (highest first), then by date (newest first)
  return results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return new Date(b.position.metadata.updated).getTime() -
           new Date(a.position.metadata.updated).getTime();
  });
}

export function getUniqueCategories(positions: Position[]): string[] {
  return Array.from(new Set(positions.map(p => p.metadata.category))).sort();
}

export function getUniqueTags(positions: Position[]): string[] {
  const allTags = positions.flatMap(p => p.metadata.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getTypeDisplayName(type: string): string {
  switch (type) {
    case 'recommendation': return 'Suositus';
    case 'action': return 'Toimenpide';
    case 'goal': return 'Tavoite';
    case 'guideline': return 'Ohje';
    default: return type;
  }
}