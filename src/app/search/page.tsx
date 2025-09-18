'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { searchPositions, getUniqueCategories, getUniqueTags, getTypeDisplayName } from '@/lib/search';
import { semanticSearch, enhanceSearchQuery, generateSearchSuggestions } from '@/lib/ai-search';
import { Position } from '@/lib/markdown/processor';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [positions, setPositions] = useState<Position[]>([]);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [useSemanticSearch, setUseSemanticSearch] = useState(true);

  // Load positions on mount
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/positions');
        if (!response.ok) {
          throw new Error('Failed to fetch positions');
        }
        const allPositions = await response.json();
        setPositions(allPositions);
      } catch (error) {
        console.error('Error loading positions:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Get filter options
  const categories = useMemo(() => getUniqueCategories(positions), [positions]);
  const tags = useMemo(() => getUniqueTags(positions), [positions]);
  const types = ['recommendation', 'action', 'goal', 'guideline'];

  // Update search suggestions when query changes
  useEffect(() => {
    if (query && query.length > 1) {
      const suggestions = generateSearchSuggestions(query, positions);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [query, positions]);

  // Search results with AI enhancement
  const searchResults = useMemo(() => {
    const filters = {
      query,
      category: selectedCategory || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      type: selectedType || undefined
    };

    return useSemanticSearch
      ? semanticSearch(positions, filters)
      : searchPositions(positions, filters);
  }, [positions, query, selectedCategory, selectedTags, selectedType, useSemanticSearch]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSelectedType('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-yellow">
        <div className="container-wide py-16">
          <div className="text-center">
            <div className="text-lg text-primary-gray-dark">Ladataan...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-yellow">
      <div className="container-wide py-8">

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-body text-3xl font-bold text-primary-gray-dark mb-6">
            Hae suosituksia
          </h1>

          <div className="max-w-2xl mb-6">
            <SearchInput
              placeholder="Hae suosituksia, aiheita tai avainsanoja..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base py-3"
            />

            {/* Search Enhancement Info */}
            {query && useSemanticSearch && (
              <div className="mt-2 p-3 bg-primary-purple/10 rounded-md">
                <div className="flex items-center text-sm text-primary-purple">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Tekoälyavusteinen haku aktiivinen - haku laajennettua käsitteiden ja synonyymien avulla
                </div>
                {(() => {
                  const enhancement = enhanceSearchQuery(query);
                  return enhancement.synonyms.length > 0 && (
                    <div className="mt-1 text-xs text-primary-gray-dark/70">
                      Mukana: {enhancement.synonyms.slice(0, 5).join(', ')}
                      {enhancement.synonyms.length > 5 && ` ja ${enhancement.synonyms.length - 5} muuta`}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-primary-gray-dark/70 mb-1">Ehdotukset:</div>
                <div className="flex flex-wrap gap-1">
                  {searchSuggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(suggestion)}
                      className="px-2 py-1 text-xs bg-neutral-gray-light hover:bg-primary-purple hover:text-white rounded-md transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-white rounded-lg p-6 mb-8">
          <h2 className="font-body text-lg font-bold text-primary-gray-dark mb-4">
            Suodattimet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-primary-gray-dark mb-2">
                Kategoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-purple"
              >
                <option value="">Kaikki kategoriat</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-primary-gray-dark mb-2">
                Tyyppi
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary-purple"
              >
                <option value="">Kaikki tyypit</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {getTypeDisplayName(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Mode & Clear Filters */}
            <div className="space-y-3">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSemanticSearch}
                    onChange={(e) => setUseSemanticSearch(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-primary-gray-dark">
                    Tekoälyavusteinen haku
                  </span>
                </label>
                <div className="text-xs text-neutral-gray-medium mt-1">
                  Ymmärtää käsitteitä ja synonyymeja
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={clearFilters}
                className="w-full"
              >
                Tyhjennä suodattimet
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-primary-gray-dark mb-2">
              Aiheet
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 20).map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-purple text-white border-primary-purple'
                      : 'bg-white text-primary-gray-dark border-neutral-gray-light hover:border-primary-purple'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-body text-xl font-bold text-primary-gray-dark">
              Tulokset ({searchResults.length})
            </h2>
            {(query || selectedCategory || selectedTags.length > 0 || selectedType) && (
              <div className="text-sm text-primary-gray-dark/70">
                {query && <span>Haku: "{query}" </span>}
                {selectedCategory && <span>Kategoria: {selectedCategory} </span>}
                {selectedType && <span>Tyyppi: {getTypeDisplayName(selectedType)} </span>}
                {selectedTags.length > 0 && <span>Aiheet: {selectedTags.join(', ')}</span>}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(({ position, score, matchedFields }) => (
              <Card
                key={position.metadata.id}
                className={`position-card-${position.metadata.ui_config?.card_color || 'gray'} h-full cursor-pointer hover:shadow-lg transition-shadow`}
                onClick={() => window.location.href = `/position/${position.metadata.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`tag-${position.metadata.ui_config?.card_color || 'gray'}`}>
                    {getTypeDisplayName(position.metadata.type)}
                  </span>
                  {query && score > 0 && (
                    <div className="text-xs text-neutral-gray-medium">
                      Relevanssi: {score}
                    </div>
                  )}
                </div>

                <h3 className="font-body text-lg text-neutral-gray-dark mb-3 line-clamp-2">
                  {position.metadata.title}
                </h3>

                <p className="text-sm text-neutral-gray-medium mb-4 line-clamp-3">
                  {position.metadata.justification}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {position.metadata.tags.slice(0, 3).map((tag) => (
                    <Tag
                      key={tag}
                      variant={position.metadata.ui_config?.card_color || 'gray'}
                      size="sm"
                    >
                      {tag}
                    </Tag>
                  ))}
                  {position.metadata.tags.length > 3 && (
                    <span className="text-xs text-neutral-gray-medium">
                      +{position.metadata.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="text-xs text-neutral-gray-medium">
                  {position.metadata.category}
                </div>

                {matchedFields.length > 0 && query && (
                  <div className="mt-2 text-xs text-primary-purple">
                    Osui: {matchedFields.join(', ')}
                  </div>
                )}
              </Card>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <div className="text-lg text-primary-gray-dark mb-2">
                Ei tuloksia
              </div>
              <div className="text-neutral-gray-medium">
                Kokeile eri hakutermejä tai muuta suodattimia
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}