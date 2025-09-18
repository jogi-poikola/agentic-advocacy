import { Position } from './markdown/processor';
import { SearchFilters, SearchResult } from './search';

// Enhanced semantic search that analyzes query intent and expands search terms
export function enhanceSearchQuery(query: string): {
  originalQuery: string;
  expandedTerms: string[];
  searchIntent: 'specific' | 'conceptual' | 'policy-area' | 'implementation';
  synonyms: string[];
} {
  const lowerQuery = query.toLowerCase().trim();

  // Define synonyms and related terms for common policy concepts
  const conceptMap: Record<string, string[]> = {
    // Digital rights and privacy
    'yksityisyys': ['tietosuoja', 'henkilötiedot', 'yksityisyydensuoja', 'data'],
    'tietosuoja': ['yksityisyys', 'henkilötiedot', 'gdpr', 'tietoturva'],
    'digitaaliset oikeudet': ['yksityisyys', 'tietosuoja', 'verkko-oikeudet', 'digitaalinen perusoikeus'],

    // AI and technology
    'tekoäly': ['ai', 'koneoppiminen', 'algoritmi', 'automaatio', 'älykkäät järjestelmät'],
    'algoritmi': ['tekoäly', 'koneoppiminen', 'automaattinen päätöksenteko'],
    'digitalisaatio': ['digitaalistaminen', 'teknologia', 'sähköistäminen'],

    // Governance and policy
    'hallinto': ['julkishallinto', 'byrokratia', 'hallintoprosessi', 'viranomaiset'],
    'säädös': ['laki', 'asetus', 'normi', 'sääntely', 'lainsäädäntö'],
    'politiikka': ['linjaus', 'strategia', 'ohjelma', 'suositus'],

    // Security and infrastructure
    'kyberturvallisuus': ['tietoturva', 'verkkoturvallisuus', 'tietosuoja', 'uhka'],
    'infrastruktuuri': ['verkosto', 'järjestelmä', 'palvelut', 'arkkitehtuuri'],

    // Economy and innovation
    'innovaatio': ['kehitys', 'uutuus', 'tutkimus', 'startup', 'yrittäjyys'],
    'talous': ['kustannus', 'budjetti', 'investointi', 'rahoitus'],
    'kilpailukyky': ['tehokkuus', 'tuottavuus', 'innovaatio', 'talous'],

    // Education and skills
    'osaaminen': ['taito', 'koulutus', 'oppiminen', 'kyvykkyys'],
    'koulutus': ['oppiminen', 'osaaminen', 'opetus', 'harjoittelu'],

    // Society and inclusion
    'saavutettavuus': ['esteettömyys', 'yhdenvertaisuus', 'tasa-arvo', 'osallisuus'],
    'osallisuus': ['mukanaolo', 'osallistuminen', 'kuuleminen', 'vaikuttaminen']
  };

  // Detect search intent
  let searchIntent: 'specific' | 'conceptual' | 'policy-area' | 'implementation' = 'specific';

  if (lowerQuery.includes('miten') || lowerQuery.includes('kuinka') || lowerQuery.includes('toteutus')) {
    searchIntent = 'implementation';
  } else if (lowerQuery.includes('politiikka') || lowerQuery.includes('strategia') || lowerQuery.includes('linja')) {
    searchIntent = 'policy-area';
  } else if (Object.keys(conceptMap).some(concept => lowerQuery.includes(concept))) {
    searchIntent = 'conceptual';
  }

  // Generate expanded terms and synonyms
  const expandedTerms: string[] = [lowerQuery];
  const synonyms: string[] = [];

  // Add synonyms for recognized concepts
  Object.entries(conceptMap).forEach(([concept, relatedTerms]) => {
    if (lowerQuery.includes(concept)) {
      synonyms.push(...relatedTerms);
      expandedTerms.push(...relatedTerms);
    }
  });

  // Add common policy terms based on intent
  if (searchIntent === 'implementation') {
    expandedTerms.push('toteutus', 'käytäntö', 'menetelmä', 'prosessi');
  } else if (searchIntent === 'policy-area') {
    expandedTerms.push('suositus', 'linjaus', 'strategia', 'ohjelma');
  }

  return {
    originalQuery: query,
    expandedTerms: Array.from(new Set(expandedTerms)),
    searchIntent,
    synonyms: Array.from(new Set(synonyms))
  };
}

// Enhanced search that uses semantic understanding
export function semanticSearch(
  positions: Position[],
  filters: SearchFilters
): SearchResult[] {
  if (!filters.query || !filters.query.trim()) {
    // If no query, return regular filtered results
    return positions
      .filter(position => {
        if (filters.category && position.metadata.category !== filters.category) return false;
        if (filters.type && position.metadata.type !== filters.type) return false;
        if (filters.tags && filters.tags.length > 0) {
          return filters.tags.some(tag => position.metadata.tags.includes(tag));
        }
        return true;
      })
      .map(position => ({ position, score: 1, matchedFields: [] }))
      .sort((a, b) => new Date(b.position.metadata.updated).getTime() - new Date(a.position.metadata.updated).getTime());
  }

  const enhancement = enhanceSearchQuery(filters.query);
  const { expandedTerms, searchIntent, synonyms } = enhancement;

  let results = positions.map(position => ({
    position,
    score: 0,
    matchedFields: [] as string[]
  }));

  // Apply semantic scoring
  results = results.map(result => {
    let score = 0;
    const matchedFields: string[] = [];

    // Search with expanded terms
    expandedTerms.forEach(term => {
      const termLower = term.toLowerCase();

      // Title matching (highest weight)
      if (result.position.metadata.title.toLowerCase().includes(termLower)) {
        score += 10;
        if (!matchedFields.includes('title')) matchedFields.push('title');
      }

      // Tag matching (high weight)
      const matchingTags = result.position.metadata.tags.filter(tag =>
        tag.toLowerCase().includes(termLower)
      );
      if (matchingTags.length > 0) {
        score += 8 * matchingTags.length;
        if (!matchedFields.includes('tags')) matchedFields.push('tags');
      }

      // Category matching
      if (result.position.metadata.category.toLowerCase().includes(termLower)) {
        score += 6;
        if (!matchedFields.includes('category')) matchedFields.push('category');
      }

      // Justification matching
      if (result.position.metadata.justification.toLowerCase().includes(termLower)) {
        score += 5;
        if (!matchedFields.includes('justification')) matchedFields.push('justification');
      }

      // Content matching
      if (result.position.content.toLowerCase().includes(termLower)) {
        score += 3;
        if (!matchedFields.includes('content')) matchedFields.push('content');
      }

      // Expected outcomes matching
      const matchingOutcomes = result.position.metadata.expected_outcomes.filter(outcome =>
        outcome.toLowerCase().includes(termLower)
      );
      if (matchingOutcomes.length > 0) {
        score += 4 * matchingOutcomes.length;
        if (!matchedFields.includes('outcomes')) matchedFields.push('outcomes');
      }
    });

    // Boost score based on search intent alignment
    if (searchIntent === 'implementation') {
      const implementationKeywords = ['toteutus', 'käytäntö', 'menetelmä', 'prosessi', 'ohje'];
      implementationKeywords.forEach(keyword => {
        if (result.position.content.toLowerCase().includes(keyword) ||
            result.position.metadata.title.toLowerCase().includes(keyword)) {
          score += 2;
        }
      });
    } else if (searchIntent === 'policy-area') {
      if (result.position.metadata.type === 'recommendation' ||
          result.position.metadata.type === 'goal') {
        score += 3;
      }
    }

    return {
      ...result,
      score,
      matchedFields
    };
  });

  // Apply other filters
  if (filters.category) {
    results = results.filter(result =>
      result.position.metadata.category === filters.category
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter(result =>
      filters.tags!.some(tag =>
        result.position.metadata.tags.includes(tag)
      )
    );
  }

  if (filters.type) {
    results = results.filter(result =>
      result.position.metadata.type === filters.type
    );
  }

  // Filter out results with no matches
  results = results.filter(result => result.score > 0);

  // Sort by score (highest first), then by date (newest first)
  return results.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    return new Date(b.position.metadata.updated).getTime() -
           new Date(a.position.metadata.updated).getTime();
  });
}

// Generate search suggestions based on query
export function generateSearchSuggestions(query: string, positions: Position[]): string[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  // Extract potential suggestions from position data
  positions.forEach(position => {
    // From titles
    if (position.metadata.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(position.metadata.title);
    }

    // From tags
    position.metadata.tags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.add(tag);
      }
    });

    // From categories
    if (position.metadata.category.toLowerCase().includes(lowerQuery)) {
      suggestions.add(position.metadata.category);
    }
  });

  return Array.from(suggestions).slice(0, 8);
}