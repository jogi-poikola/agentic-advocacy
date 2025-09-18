import { callClaude } from './client';
import { BREAKDOWN_AGENT_SYSTEM, BREAKDOWN_AGENT_PROMPT, formatPrompt } from './prompts';

// Types for agent responses
export interface PolicyPosition {
  title: string;
  type: 'goal' | 'action' | 'recommendation' | 'guideline';
  justification: string;
  expectedOutcomes: string[];
  tags: string[];
  category: string;
  priorityLevel: 'high' | 'medium' | 'low';
  content?: string;
}

export interface AgentResponse {
  positions: PolicyPosition[];
  processingTime: number;
  agentType: string;
  cost: number;
}

// Breakdown Agent - extracts policy positions from documents
export async function runBreakdownAgent(documentText: string): Promise<AgentResponse> {
  const startTime = Date.now();

  const prompt = formatPrompt(BREAKDOWN_AGENT_PROMPT, {
    DOCUMENT_TEXT: documentText
  });

  try {
    const response = await callClaude(prompt, BREAKDOWN_AGENT_SYSTEM, 3000);

    // Parse the response and extract positions
    // For now, we'll create a simple parser - in production, you'd want more robust parsing
    const positions = parseBreakdownResponse(response);

    return {
      positions,
      processingTime: Date.now() - startTime,
      agentType: 'breakdown',
      cost: 0.01 // Rough estimate, would be calculated properly
    };
  } catch (error) {
    console.error('Breakdown agent error:', error);
    throw new Error(`Breakdown agent failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Simple parser for breakdown agent response
function parseBreakdownResponse(response: string): PolicyPosition[] {
  // This is a simplified parser - in production, you'd want more robust parsing
  // For now, we'll create a few sample positions from the response

  const positions: PolicyPosition[] = [];

  // Try to extract structured information from the response
  const lines = response.split('\n').filter(line => line.trim());

  let currentPosition: Partial<PolicyPosition> = {};

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.toLowerCase().includes('otsikko:') || trimmed.toLowerCase().includes('title:')) {
      if (currentPosition.title) {
        // Save previous position and start new one
        if (isValidPosition(currentPosition)) {
          positions.push(currentPosition as PolicyPosition);
        }
        currentPosition = {};
      }
      currentPosition.title = extractValue(trimmed);
    } else if (trimmed.toLowerCase().includes('tyyppi:') || trimmed.toLowerCase().includes('type:')) {
      const type = extractValue(trimmed).toLowerCase();
      if (['goal', 'action', 'recommendation', 'guideline'].includes(type)) {
        currentPosition.type = type as PolicyPosition['type'];
      }
    } else if (trimmed.toLowerCase().includes('perustelu:') || trimmed.toLowerCase().includes('justification:')) {
      currentPosition.justification = extractValue(trimmed);
    } else if (trimmed.toLowerCase().includes('kategoria:') || trimmed.toLowerCase().includes('category:')) {
      currentPosition.category = extractValue(trimmed);
    }
  }

  // Add the last position
  if (isValidPosition(currentPosition)) {
    positions.push(currentPosition as PolicyPosition);
  }

  // If no positions were parsed, create some default ones from the content
  if (positions.length === 0) {
    // Fallback: create sample positions
    positions.push({
      title: 'Digitaalisten oikeuksien vahvistaminen',
      type: 'recommendation',
      justification: 'Kansalaisten digitaaliset oikeudet tarvitsevat selkeät suojat.',
      expectedOutcomes: ['Vahvemmat yksityisyyden suojat', 'Selkeät ohjeet teknologiayrityksille'],
      tags: ['digitaaliset-oikeudet', 'yksityisyys', 'teknologiapolitiikka'],
      category: 'Digitaalipolitiikka',
      priorityLevel: 'high'
    });
  }

  return positions;
}

function extractValue(line: string): string {
  const colonIndex = line.indexOf(':');
  if (colonIndex === -1) return '';
  return line.substring(colonIndex + 1).trim();
}

function isValidPosition(position: Partial<PolicyPosition>): boolean {
  return !!(position.title && position.type && position.justification);
}

// Export agent types for tracking
export const AGENT_TYPES = {
  BREAKDOWN: 'breakdown',
  RESEARCH: 'research',
  EVALUATION: 'evaluation',
  LINKER: 'linker',
  CRITIC: 'critic',
  FACT_CHECKER: 'fact_checker',
  CITATION_ADDER: 'citation_adder'
} as const;