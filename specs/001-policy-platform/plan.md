# Implementation Plan: AI-Powered Policy Platform

**Branch**: `001-policy-platform` | **Date**: 2025-09-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-policy-platform/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → ✅ Feature spec loaded successfully
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ Project Type: web (frontend + backend static site)
   → ✅ Structure Decision: Option 2 (Web application)
3. Fill the Constitution Check section based on the content of the constitution document.
   → ✅ Constitution template loaded (placeholder values found)
4. Evaluate Constitution Check section below
   → ✅ No violations - template constitution
   → ✅ Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → ✅ Research completed
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, CLAUDE.md
   → ✅ Design artifacts generated
7. Re-evaluate Constitution Check section
   → ✅ No new violations
   → ✅ Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
   → ✅ Task planning approach documented
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 8. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
AI-powered policy platform for Tietopolitiikka.fi enabling stakeholder input collection, AI-assisted position drafting, human curation, and public position publishing. Built as a static Next.js site with file-based storage (Markdown + Git), Claude API integration, and Google Docs editing interface. Designed for 10-50 concurrent users with 20MB file upload support.

## Technical Context
**Language/Version**: TypeScript with Next.js 14+
**Primary Dependencies**: Next.js, Tailwind CSS, Fuse.js, Gray-matter, Anthropic Claude API, Google Drive API
**Storage**: Markdown files in Git repository (file-based, version controlled)
**Testing**: Jest + React Testing Library for frontend, Node.js test runner for API routes
**Target Platform**: Static site deployed to Vercel (free tier)
**Project Type**: web - Next.js static site generation with API routes
**Performance Goals**: Support 10-50 concurrent users, fast search across 200+ positions
**Constraints**: 20MB file upload limit, shared password auth (extensible), GDPR-compliant
**Scale/Scope**: MVP with 20 input documents, 200 positions, public search interface

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Constitution Status**: Template constitution found with placeholder values
- No specific constitutional principles defined yet
- No violations to evaluate
- Proceeding with standard best practices

## Project Structure

### Documentation (this feature)
```
specs/001-policy-platform/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (Next.js static site)
src/
├── components/          # React components
│   ├── forms/          # Input submission forms
│   ├── search/         # Search interface
│   ├── position/       # Position display components
│   └── admin/          # Curator interface
├── pages/              # Next.js pages
│   ├── api/            # API routes for uploads, auth
│   ├── admin/          # Protected curator interface
│   ├── positions/      # Public position pages
│   └── search/         # Search interface
├── lib/                # Utilities
│   ├── ai/             # Claude API integration
│   ├── auth/           # Authentication
│   ├── search/         # Fuse.js search setup
│   └── markdown/       # Markdown processing
├── data/               # Markdown storage
│   ├── positions/      # Position files
│   ├── inputs/         # Input documents
│   └── metadata/       # Index files
└── types/              # TypeScript definitions

tests/
├── api/                # API route tests
├── components/         # Component tests
└── integration/        # E2E tests
```

**Structure Decision**: Option 2 (Web application) - Next.js handles both static site generation and API routes

## Phase 0: Outline & Research
✅ **Research Complete**

### Key Technology Decisions
1. **Framework**: Next.js 14+ with static site generation + API routes
   - **Rationale**: Handles both static public site and dynamic API endpoints, excellent Vercel integration
   - **Alternatives**: Separate frontend/backend rejected for complexity

2. **AI Integration**: Anthropic Claude API with official SDK
   - **Rationale**: Direct API access, no additional frameworks needed
   - **Alternatives**: LangChain rejected for MVP simplicity

3. **Search**: Fuse.js client-side fuzzy search
   - **Rationale**: No server needed, scales to thousands of positions, works offline
   - **Alternatives**: Server-side search rejected for hosting complexity

4. **Storage**: Markdown files with Git version control
   - **Rationale**: Human-readable, version controlled, no database needed
   - **Alternatives**: Database rejected for MVP complexity

5. **Authentication**: Simple shared password with next-auth.js foundation
   - **Rationale**: Extensible to OAuth later, minimal setup
   - **Alternatives**: No auth rejected for security

## Phase 1: Design & Contracts
✅ **Design Complete**

Generated artifacts:
- `data-model.md`: Core entities (Position, InputDocument, User, AIAgent)
- `contracts/`: API schemas for file upload, position management, auth
- `quickstart.md`: Developer setup and validation steps
- `CLAUDE.md`: AI assistant context file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Core features: Input collection → AI processing → Curation → Publishing
- File-based implementation: Markdown CRUD operations
- Search implementation: Index generation + client-side search
- Authentication: Shared password middleware
- AI agents: Claude API integration with specialized prompts

**Ordering Strategy**:
1. **Foundation**: Project setup, data models, file operations
2. **Core API**: File upload, markdown processing, authentication
3. **AI Integration**: Claude API, prompt engineering, agent workflows
4. **Frontend**: Public site, search interface, position display
5. **Admin Interface**: Curator tools, editing integration
6. **Integration**: End-to-end workflows, testing

**Estimated Output**: 20-25 numbered, ordered tasks focusing on MVP functionality

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*No constitutional violations identified*

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none)

---
*Based on Constitution template - See `/.specify/memory/constitution.md`*