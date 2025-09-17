# Claude Code Context: AI-Powered Policy Platform

**Project**: Agentic Advocacy Platform for Tietopolitiikka.fi
**Tech Stack**: Next.js 14+ with TypeScript, Tailwind CSS + Tietopolitiikka.fi Design System, Claude API
**Architecture**: Static site generation with file-based storage
**Target**: 1-month MVP for Finnish policy advocacy organization

## Project Overview

Building an AI-powered platform that transforms policy advocacy from manual document processing to automated position generation. Stakeholders submit policy documents, AI agents process them into draft positions, curators review and publish them on a public searchable website.

### Key Components
- **Input Collection**: Web form for document uploads (PDF, DOCX, TXT, max 20MB)
- **AI Processing**: Claude API integration with specialized agent prompts
- **Curation Interface**: Admin dashboard for reviewing and editing positions
- **Public Website**: Search-first interface for published policy positions
- **Storage**: Markdown files with Git version control (no database)

## Current Tech Stack

### Core Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "@anthropic-ai/sdk": "^0.21.0",
  "next-auth": "^4.24.0",
  "tailwindcss": "^3.4.0",
  "fuse.js": "^7.0.0",
  "gray-matter": "^4.0.3",
  "@next/font": "^14.0.0"
}
```

### Design System Integration
```json
{
  "colors": {
    "primary": {
      "yellow": "#ffde59",
      "purple": "#5e17eb",
      "gray-dark": "#383838"
    },
    "neutral": {
      "white": "#ffffff",
      "gray-light": "#f5f5f5",
      "gray-medium": "#cccccc"
    }
  },
  "typography": {
    "heading": "Unica One",
    "body": "Lato"
  },
  "spacing": [4, 8, 16, 24, 32, 48],
  "breakpoints": {
    "mobile": "0-640px",
    "tablet": "641-1024px",
    "desktop": "1025px+"
  }
}
```

### Project Structure
```
src/
├── components/          # React components
│   ├── forms/          # Input submission forms
│   ├── search/         # Search interface
│   ├── position/       # Position display components
│   └── admin/          # Curator interface
├── pages/              # Next.js pages and API routes
│   ├── api/            # API endpoints
│   ├── admin/          # Protected curator interface
│   └── positions/      # Public position pages
├── lib/                # Utilities and integrations
│   ├── ai/             # Claude API integration
│   ├── auth/           # Authentication helpers
│   ├── search/         # Fuse.js search setup
│   └── markdown/       # File processing
├── data/               # Markdown storage
│   ├── positions/      # Position files
│   ├── inputs/         # Input documents
│   └── metadata/       # Search indexes
└── types/              # TypeScript definitions
```

## Key Features

### 1. Stakeholder Input Submission
- Multi-file upload form with validation
- GDPR compliance checkbox (user responsibility)
- Automatic file processing and storage
- Support for PDF, DOCX, TXT files up to 20MB

### 2. AI Processing Pipeline
Claude API integration with specialized agents:
- **Breakdown Agent**: Extract key policy ideas from documents
- **Research Agent**: Add context and background information
- **Evaluation Agent**: Check consistency and quality
- **Linker Agent**: Suggest connections to existing positions

### 3. Curator Workflow
- Shared password authentication (extensible to individual accounts)
- Review and edit AI-generated drafts
- Approve positions for publication
- Manage position relationships and dependencies

### 4. Public Interface
- Search-first navigation with Fuse.js
- Position browsing by category and tags
- Individual position pages with related links
- Mobile-responsive design with Tailwind CSS

## Data Models

### Position (Markdown with Frontmatter)
```yaml
---
id: "001"
title: "Digital Rights Framework"
type: "recommendation" # goal|action|recommendation|guideline
status: "public" # draft|public|unpublished
tags: ["digital-rights", "privacy"]
category: "Digital Policy"
justification: "Why this matters..."
expected_outcomes: ["outcome1", "outcome2"]
dependencies: [{"position_id": "002", "description": "..."}]
related_positions: ["003", "012"]
source_documents: ["input-001"]
---
# Position content in markdown...
```

### Input Document
```yaml
---
id: "input-001"
title: "Climate Policy Brief"
submitted_at: "2025-09-17T10:00:00Z"
submitter_type: "organization"
processing_status: "completed"
generated_positions: ["023", "024"]
gdpr_compliant: true
---
```

## Development Guidelines

### File Operations
- Use `gray-matter` for parsing markdown frontmatter
- Store all data in `src/data/` for static generation
- Implement file naming conventions (001-title.md)
- Generate search indexes at build time

### Authentication
- Shared password stored in environment variables
- next-auth.js for session management
- Middleware protection for admin routes
- Extensible design for future OAuth integration

### AI Integration
- Direct Claude API calls (no LangChain for MVP)
- Specialized prompts for each agent type
- Error handling and retry logic
- Cost tracking and usage monitoring

### Search Implementation
- Client-side search with Fuse.js
- Pre-built search index for performance
- Fuzzy matching across content, tags, and metadata
- Search result highlighting and filtering

## Recent Changes

### 2025-09-17: Initial Planning
- Created comprehensive feature specification
- Defined data models and API contracts
- Established Next.js + Claude API architecture
- Generated implementation plan and quickstart guide
- Integrated Tietopolitiikka.fi design system

### Key Decisions Made
1. **File-based storage**: Chose Markdown + Git over database for simplicity
2. **Next.js architecture**: Single framework for static site + API routes
3. **Claude API direct**: No AI framework wrapper for MVP
4. **Shared password auth**: Simple MVP authentication with extensible design
5. **Client-side search**: Fuse.js for performance and offline capability
6. **Design system**: Tietopolitiikka.fi visual identity with accessibility-first approach

### Design Principles Applied
- **Collaborative**: Every element invites participation and transparency
- **Happy**: Light, open layouts with bright yellow accent for positivity
- **Trustworthy**: Typography and spacing reinforce credibility
- **Minimal & Modern**: Avoid clutter, prioritize clarity and whitespace
- **Accessibility-first**: WCAG AA compliance in all design decisions

## Environment Configuration

### Required Environment Variables
```bash
ANTHROPIC_API_KEY=sk-ant-...           # Claude API access
NEXTAUTH_SECRET=random-string          # Session encryption
NEXTAUTH_URL=http://localhost:3000     # Base URL
ADMIN_PASSWORD=secure-password         # Shared curator password
```

### Optional Variables
```bash
GOOGLE_CLIENT_ID=...                   # Future Google Drive integration
GOOGLE_CLIENT_SECRET=...               # Future Google Drive integration
```

## Testing Strategy

### Unit Tests
- React component testing with Jest + RTL
- API route testing with Node.js test runner
- Markdown processing and search functionality

### Integration Tests
- End-to-end user workflows with Playwright
- File upload and AI processing pipeline
- Authentication and authorization flows

### Performance Testing
- Search response time validation (<500ms)
- Concurrent user handling (10-50 users)
- File upload limits and processing

## Deployment

### Hosting Platform
- **Primary**: Vercel free tier (perfect Next.js integration)
- **CDN**: Vercel Edge Network for global performance
- **Domain**: Custom domain when ready
- **Environment**: Production environment variables in Vercel dashboard

### CI/CD Pipeline
- GitHub integration for automatic deployments
- Preview deployments for feature branches
- Health checks and error monitoring

## Known Constraints

### MVP Limitations
- Single shared password for curators
- 20MB file upload limit
- 10-50 concurrent user capacity
- No real-time collaboration features
- Basic error handling and monitoring

### Future Enhancements
- Individual curator accounts with roles
- Google Docs integration for collaborative editing
- Advanced AI agent orchestration
- Visual network representations of positions
- Advocacy campaign planning tools

---

**Context Version**: 1.0.0
**Last Updated**: 2025-09-17
**Status**: Implementation planning complete, ready for development