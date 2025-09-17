# Data Model: AI-Powered Policy Platform

**Date**: 2025-09-17
**Storage**: Markdown files with frontmatter, Git version control
**Context**: File-based architecture, no database required

## Core Entities

### Position
**Purpose**: Core policy recommendation entity
**Storage**: `src/data/positions/{id}.md`
**Filename Pattern**: `001-digital-rights-framework.md`

**Frontmatter Schema**:
```yaml
---
id: "001"
title: "Digital Rights Framework for Finland"
type: "recommendation" # goal | action | recommendation | guideline
status: "public" # draft | public | unpublished
created: "2025-09-17T10:00:00Z"
updated: "2025-09-17T15:30:00Z"
author: "AI Agent + Curator Review"
tags: ["digital-rights", "privacy", "technology-policy"]
category: "Digital Policy"
justification: "Citizens need clear digital rights protections in the modern economy"
expected_outcomes:
  - "Stronger privacy protections for Finnish citizens"
  - "Clear guidelines for technology companies"
  - "Increased public trust in digital services"
dependencies:
  - position_id: "002"
    description: "Data Protection Infrastructure"
  - position_id: "015"
    description: "Digital Identity Framework"
related_positions: ["003", "012", "028"]
source_documents: ["input-001", "input-045"]
google_doc_id: "1BxY..." # optional
review_status:
  ai_generated: true
  curator_approved: true
  approved_by: "admin"
  approved_at: "2025-09-17T15:30:00Z"
---

# Digital Rights Framework for Finland

## Summary
[Position content in markdown...]

## Background
[Detailed justification...]

## Expected Impact
[Outcomes and effects...]

## Implementation Steps
[If type is "action"...]
```

**Validation Rules**:
- `id` must be unique, numeric string
- `type` must be one of: goal, action, recommendation, guideline
- `status` controls public visibility
- `tags` must be lowercase, hyphenated
- `expected_outcomes` must be array of strings
- `dependencies` and `related_positions` must reference existing positions

### InputDocument
**Purpose**: Raw stakeholder submissions for AI processing
**Storage**: `src/data/inputs/{id}.md`
**Filename Pattern**: `input-001-climate-policy-brief.md`

**Frontmatter Schema**:
```yaml
---
id: "input-001"
title: "Climate Policy Brief - Finnish Technology Sector"
submitted_at: "2025-09-15T14:22:00Z"
submitter_type: "organization" # individual | organization | expert
organization: "Finnish Tech Association" # if organization
file_size: 2048576 # bytes
file_type: "application/pdf"
original_filename: "climate-tech-policy-2025.pdf"
processing_status: "completed" # pending | processing | completed | failed
ai_processed_at: "2025-09-16T09:15:00Z"
generated_positions: ["023", "024", "025"]
tags: ["climate", "technology", "sustainability"]
gdpr_compliant: true # user confirmed no personal data
review_notes: "Comprehensive analysis of green tech policy needs"
---

# Climate Policy Brief - Finnish Technology Sector

## Original Content
[Extracted/processed content from uploaded file...]

## AI Processing Summary
Generated 3 draft positions:
- Position 023: Green Tech Investment Framework
- Position 024: Sustainable Computing Standards
- Position 025: Carbon Neutral Digital Services

## Processing Log
- 2025-09-16 09:15: Breakdown Agent extracted key themes
- 2025-09-16 09:18: Research Agent added background context
- 2025-09-16 09:25: Position drafts created and linked
```

**Validation Rules**:
- `file_size` must be ≤ 20MB (20971520 bytes)
- `submitter_type` must be one of: individual, organization, expert
- `processing_status` tracks AI workflow state
- `gdpr_compliant` must be true (user responsibility)

### User
**Purpose**: System user management (curators, stakeholders, readers)
**Storage**: `src/data/users/users.json` (simple file for MVP)

**Schema**:
```json
{
  "curators": [
    {
      "id": "admin",
      "role": "curator",
      "permissions": ["read", "write", "approve", "admin"],
      "created_at": "2025-09-17T00:00:00Z",
      "last_login": "2025-09-17T15:45:00Z"
    }
  ],
  "stakeholders": [
    {
      "session_id": "temp-12345",
      "role": "stakeholder",
      "permissions": ["submit"],
      "submissions": ["input-001", "input-002"],
      "created_at": "2025-09-15T14:20:00Z"
    }
  ]
}
```

**Note**: MVP uses shared password for curators, session-based for stakeholders

### AIAgent
**Purpose**: AI processing workflow tracking
**Storage**: `src/data/agents/processing-log.json`

**Schema**:
```json
{
  "processing_sessions": [
    {
      "session_id": "proc-001",
      "input_document_id": "input-001",
      "started_at": "2025-09-16T09:15:00Z",
      "completed_at": "2025-09-16T09:25:00Z",
      "agents_used": [
        {
          "agent_type": "breakdown",
          "prompt_version": "v1.0",
          "processing_time_ms": 3200,
          "output": "Identified 5 key policy themes..."
        },
        {
          "agent_type": "research",
          "prompt_version": "v1.0",
          "processing_time_ms": 4100,
          "output": "Added background context from 12 sources..."
        }
      ],
      "generated_positions": ["023", "024", "025"],
      "total_cost_usd": 0.15
    }
  ]
}
```

## Relationships

### Position ↔ Position
- **Dependencies**: Position A requires Position B to be implemented first
- **Related**: Positions share themes or complement each other
- **Conflicts**: Positions that cannot coexist (handled in curation)

### InputDocument → Position
- **One-to-Many**: Single input can generate multiple positions
- **Traceability**: Each position tracks source documents
- **Version Control**: Git history maintains document evolution

### User → Position/InputDocument
- **Curator → Position**: Create, edit, approve, publish
- **Stakeholder → InputDocument**: Submit for processing
- **Reader → Position**: View public positions only

## File Organization

```
src/data/
├── positions/
│   ├── 001-digital-rights-framework.md
│   ├── 002-data-protection-infrastructure.md
│   └── ...
├── inputs/
│   ├── input-001-climate-policy-brief.md
│   ├── input-002-education-technology.md
│   └── ...
├── metadata/
│   ├── positions-index.json      # Search index
│   ├── tags-taxonomy.json        # Tag definitions
│   └── categories.json           # Category structure
├── users/
│   └── users.json                # User management
└── agents/
    ├── processing-log.json       # AI workflow tracking
    └── prompts/                  # Agent prompt templates
        ├── breakdown-v1.0.md
        ├── research-v1.0.md
        └── ...
```

## Index Generation

### Position Search Index
**File**: `src/data/metadata/positions-index.json`
**Generated**: Build time + runtime updates
**Purpose**: Power client-side search with Fuse.js

```json
{
  "positions": [
    {
      "id": "001",
      "title": "Digital Rights Framework for Finland",
      "type": "recommendation",
      "status": "public",
      "tags": ["digital-rights", "privacy", "technology-policy"],
      "category": "Digital Policy",
      "content_excerpt": "Citizens need clear digital rights...",
      "updated": "2025-09-17T15:30:00Z",
      "related_positions": ["003", "012", "028"],
      "search_weight": 1.0
    }
  ],
  "last_updated": "2025-09-17T16:00:00Z",
  "total_positions": 42
}
```

### Tag Taxonomy
**File**: `src/data/metadata/tags-taxonomy.json`
**Purpose**: Consistent tagging and search facets

```json
{
  "categories": {
    "technology-policy": {
      "label": "Technology Policy",
      "tags": ["digital-rights", "ai-governance", "data-protection"],
      "color": "#3B82F6"
    },
    "economic-policy": {
      "label": "Economic Policy",
      "tags": ["innovation-funding", "startup-support", "tax-policy"],
      "color": "#10B981"
    }
  }
}
```

## State Transitions

### Position Lifecycle
```
draft → (curator review) → public
     ↘ (rejected) → unpublished
public → (curator edit) → draft → public
public → (archived) → unpublished
```

### Input Processing Workflow
```
pending → processing → completed → positions_generated
        ↘ failed → (retry/manual review)
```

## Validation & Constraints

### File Size Limits
- Position markdown: No limit (text only)
- Input documents: 20MB maximum
- Images in positions: 5MB per image

### Naming Conventions
- Position IDs: 3-digit numbers (001, 002, ...)
- Input IDs: "input-" + 3-digit numbers
- Tags: lowercase, hyphen-separated
- Files: kebab-case with appropriate extensions

### Data Integrity
- All referenced positions must exist
- Circular dependencies not allowed
- Required frontmatter fields must be present
- Dates must be ISO 8601 format

---

**Status**: ✅ Complete
**Next**: API contract definitions