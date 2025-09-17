# Tasks: AI-Powered Policy Platform

**Input**: Design documents from `/specs/001-policy-platform/`
**Prerequisites**: plan.md (✓), research.md (✓), data-model.md (✓), contracts/ (✓), design-system.md (✓)

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → ✓ Tech stack: Next.js 14+ + TypeScript + Tailwind CSS + Tietopolitiikka.fi Design System
   → ✓ Project type: web application with static site generation
2. Load optional design documents:
   → ✓ data-model.md: Position, InputDocument, User, AIAgent entities
   → ✓ contracts/: 15+ API endpoints for auth, positions, inputs, AI, search
   → ✓ design-system.md: Complete visual identity with colors, typography, components
3. Generate tasks by category:
   → Setup: Next.js init, Tailwind + design system, dependencies
   → Visual First: Homepage, position cards, search interface (for early feedback)
   → Core UI: Forms, navigation, responsive layout
   → Data Layer: File operations, markdown processing
   → API Routes: Authentication, file upload, position management
   → AI Integration: Claude API, agent workflows
   → Testing: Component tests, API tests, E2E tests
4. Apply task rules:
   → Visual components marked [P] for parallel development
   → Sequential for shared files (same component library)
   → TDD approach: tests before implementation
5. Priority: Early visual feedback with working design system
6. Context: "break this down so that early on we get a visual look and feel of the project"
```

---

## Task Breakdown

### Phase 1: Foundation & Visual Setup (Early Visual Feedback)

**T001: Project Setup and Dependencies**
**Path**: Repository root
**Dependencies**: None
**Parallel**: No
**Objective**: Initialize Next.js project with TypeScript and design system dependencies
**Details**:
- Initialize Next.js 14+ project with TypeScript
- Install dependencies: `@anthropic-ai/sdk`, `next-auth`, `fuse.js`, `gray-matter`
- Install design system deps: `@next/font` for Unica One and Lato fonts
- Configure package.json scripts for dev, build, test, lint
- Set up basic folder structure: `src/components/`, `src/pages/`, `src/lib/`, `src/data/`
- Create `.env.local.example` with required environment variables

**T002: Tailwind CSS + Design System Configuration [P]**
**Path**: `tailwind.config.js`, `src/styles/globals.css`
**Dependencies**: T001
**Parallel**: Yes (separate config files)
**Objective**: Implement Tietopolitiikka.fi design system in Tailwind
**Details**:
- Configure Tailwind with custom theme extending design system colors
- Add primary colors: yellow (#ffde59), purple (#5e17eb), gray-dark (#383838)
- Add neutral colors: white, gray-light (#f5f5f5), gray-medium (#cccccc)
- Configure typography with Unica One (headings) and Lato (body)
- Set up spacing scale: [4, 8, 16, 24, 32, 48]px
- Configure responsive breakpoints: mobile (640px), tablet (1024px), desktop (1280px)
- Import Google Fonts and set up font utilities

**T003: Design System Component Library [P]**
**Path**: `src/components/ui/`
**Dependencies**: T002
**Parallel**: Yes (separate component files)
**Objective**: Create reusable UI components matching design system
**Details**:
- Button components: `.btn-primary`, `.btn-secondary` with hover states
- Form components: `.form-input`, `.form-label`, `.form-error` with focus states
- Card component: `.position-card` with priority variants (purple/yellow/gray borders)
- Tag component: `.tag-pill` with yellow background and hover effects
- Typography components: headings with Unica One, body text with Lato
- Ensure WCAG AA contrast ratios (4.5:1 minimum)
- Add transition animations (200-300ms) and reduced motion support

**T004: Layout and Navigation Shell [P]**
**Path**: `src/components/layout/`
**Dependencies**: T003
**Parallel**: Yes (layout components)
**Objective**: Create main layout with Finnish-first navigation
**Details**:
- Header component with Tietopolitiikka.fi branding (purple logo area)
- Search-first navigation with prominent search bar (yellow border)
- Main layout wrapper with responsive grid (max-width 1200px)
- Footer with minimal links and attribution
- Mobile-responsive hamburger menu for tablet/mobile
- Finnish text: "Hae tietopolitiikan ehdotuksia..." search placeholder
- Accessibility: skip links, proper ARIA labels, keyboard navigation

### Phase 2: Core Visual Interface (Immediate Visual Feedback)

**T005: Homepage with Search Interface**
**Path**: `src/pages/index.tsx`, `src/components/search/`
**Dependencies**: T004
**Parallel**: No (single page)
**Objective**: Create visually appealing homepage with prominent search
**Details**:
- Hero section with clean typography (Unica One headers)
- Centered search bar with yellow accent and purple focus states
- Sample position cards displaying with proper visual hierarchy
- Category filter pills using design system colors
- Generous whitespace following "happy" design principle
- Responsive layout working on mobile, tablet, desktop
- Finnish content with formal, trustworthy tone

**T006: Position Card Components [P]**
**Path**: `src/components/position/PositionCard.tsx`
**Dependencies**: T003
**Parallel**: Yes (standalone component)
**Objective**: Visual position display with design system styling
**Details**:
- Card layout with title (Unica One), justification (Lato), tags
- Color-coded left border based on priority (purple/yellow/gray)
- Tag pills with yellow background and readable contrast
- Hover effects with subtle elevation (translateY(-2px))
- Display UI metadata: card_color, priority_level, icon
- Link to individual position pages
- Proper spacing using design system scale (24px padding)

**T007: Search Results Interface [P]**
**Path**: `src/components/search/SearchResults.tsx`
**Dependencies**: T006
**Parallel**: Yes (standalone component)
**Objective**: Visual search results with highlighting and filtering
**Details**:
- Search result list with position cards
- Search term highlighting in yellow background
- Filter sidebar with category buttons (design system colors)
- "No results" state with helpful Finnish text: "Ei tuloksia haulle"
- Loading state with subtle progress indicator (purple)
- Pagination or infinite scroll for large result sets
- Sort options: relevance, date, category

**T008: Individual Position Page Template [P]**
**Path**: `src/pages/positions/[id].tsx`, `src/components/position/PositionDetail.tsx`
**Dependencies**: T006
**Parallel**: Yes (separate page template)
**Objective**: Detailed position view with full design system styling
**Details**:
- Full position content with proper typography hierarchy
- Metadata display: category, tags, created/updated dates
- Related positions section with mini cards
- Dependencies visualization (simple list with links)
- Breadcrumb navigation back to search
- Social sharing buttons (if required)
- Print-friendly styling

### Phase 3: Data Layer & Content Management

**T009: Sample Data and Content [P]**
**Path**: `src/data/positions/`, `src/data/metadata/`
**Dependencies**: None (can run parallel with UI)
**Parallel**: Yes (data files)
**Objective**: Create sample positions to populate the visual interface
**Details**:
- Create 5-10 sample position markdown files with frontmatter
- Include variety of types: recommendation, goal, action, guideline
- Add Finnish policy content: digital rights, climate, education
- Set up UI metadata: card_color, priority_level, icon fields
- Create sample tags taxonomy with design system colors
- Generate positions-index.json for search functionality

**T010: Markdown Processing Library [P]**
**Path**: `src/lib/markdown/`
**Dependencies**: T001
**Parallel**: Yes (utility library)
**Objective**: Handle markdown file reading and frontmatter parsing
**Details**:
- Set up gray-matter for frontmatter extraction
- Create utility functions: `loadPosition()`, `loadAllPositions()`
- Handle file system operations for static generation
- Parse and validate position metadata
- Generate search index from position content
- Error handling for malformed markdown files

**T011: Static Site Generation Setup**
**Path**: `src/pages/`, Next.js config
**Dependencies**: T010
**Parallel**: No (affects build process)
**Objective**: Configure Next.js to generate static pages from markdown
**Details**:
- Set up `getStaticProps` for homepage with position data
- Configure `getStaticPaths` for individual position pages
- Implement incremental static regeneration (ISR) for updates
- Generate static search index at build time
- Configure Next.js for optimized static export
- Set up proper head metadata for SEO

### Phase 4: Interactive Features

**T012: Client-Side Search Implementation**
**Path**: `src/lib/search/`, `src/hooks/useSearch.ts`
**Dependencies**: T011
**Parallel**: No (integrates with existing components)
**Objective**: Implement Fuse.js search with real-time results
**Details**:
- Configure Fuse.js with position content, tags, titles
- Implement search hook with debounced queries
- Add search filters: category, tags, type
- Search result highlighting and relevance scoring
- Store search state in URL parameters
- Performance optimization: <500ms response time

**T013: Input Submission Form [P]**
**Path**: `src/pages/submit.tsx`, `src/components/forms/`
**Dependencies**: T003 (form components)
**Parallel**: Yes (new page)
**Objective**: Create stakeholder input submission interface
**Details**:
- Multi-step form: title, organization, file upload, GDPR consent
- File upload with 20MB limit and progress indicator
- Form validation with clear error messages in Finnish
- Success state with confirmation message
- Preview of uploaded document metadata
- Responsive design working on mobile devices

### Phase 5: API Routes & Backend

**T014: Authentication API Routes [P]**
**Path**: `src/pages/api/auth/`
**Dependencies**: T001 (next-auth setup)
**Parallel**: Yes (separate API routes)
**Objective**: Implement shared password authentication
**Details**:
- Configure next-auth with credentials provider
- Shared password validation against environment variable
- Session management with secure cookies
- Login/logout API endpoints
- Protected route middleware for admin pages
- Error handling and security headers

**T015: File Upload API Route [P]**
**Path**: `src/pages/api/inputs/upload.ts`
**Dependencies**: T001
**Parallel**: Yes (separate API route)
**Objective**: Handle document uploads with validation
**Details**:
- Multer or built-in Next.js file handling
- File size validation (20MB limit)
- File type validation (PDF, DOCX, TXT)
- Save to `src/data/inputs/` with metadata
- Generate unique input IDs
- GDPR compliance validation
- Error handling and status responses

**T016: Position Management API Routes [P]**
**Path**: `src/pages/api/positions/`
**Dependencies**: T010 (markdown processing)
**Parallel**: Yes (separate API routes)
**Objective**: CRUD operations for position management
**Details**:
- GET `/api/positions` - list positions with filtering
- GET `/api/positions/[id]` - individual position
- POST `/api/positions` - create new position (admin only)
- PUT `/api/positions/[id]` - update position (admin only)
- PATCH `/api/positions/[id]/status` - publish/unpublish
- Authentication middleware for write operations

### Phase 6: Admin Interface

**T017: Admin Authentication Pages [P]**
**Path**: `src/pages/admin/`, `src/components/admin/`
**Dependencies**: T014
**Parallel**: Yes (admin-specific pages)
**Objective**: Curator login and dashboard interface
**Details**:
- Login page with shared password form
- Admin dashboard with overview statistics
- Protected route wrapper for admin pages
- Session persistence and logout functionality
- Error handling for authentication failures
- Redirect after successful login

**T018: Admin Position Management [P]**
**Path**: `src/pages/admin/positions/`, `src/components/admin/`
**Dependencies**: T017, T016
**Parallel**: Yes (admin interface)
**Objective**: Interface for curators to manage positions
**Details**:
- Position list with draft/public status indicators
- Edit position form with markdown preview
- Status change buttons (draft ↔ public)
- Bulk operations: publish multiple positions
- Position relationship management (dependencies, related)
- Version history display (via Git integration)

**T019: Input Document Review Interface [P]**
**Path**: `src/pages/admin/inputs/`, `src/components/admin/`
**Dependencies**: T017, T015
**Parallel**: Yes (admin interface)
**Objective**: Interface for reviewing submitted documents
**Details**:
- List of submitted documents with processing status
- Document preview and metadata display
- Trigger AI processing button
- Generated position preview before approval
- Document approval/rejection workflow
- Search and filtering of submissions

### Phase 7: AI Integration

**T020: Claude API Integration [P]**
**Path**: `src/lib/ai/`, `src/pages/api/ai/`
**Dependencies**: T001 (Anthropic SDK)
**Parallel**: Yes (AI utility library)
**Objective**: Claude API client with specialized prompts
**Details**:
- Configure Anthropic SDK with API key from environment
- Create AI agent prompt templates for breakdown, research, evaluation
- Implement retry logic and error handling
- Rate limiting and cost tracking
- Response parsing and validation
- Integration with position creation workflow

**T021: AI Processing Workflow [P]**
**Path**: `src/lib/ai/agents/`, `src/pages/api/ai/process/`
**Dependencies**: T020
**Parallel**: Yes (AI processing logic)
**Objective**: Document processing pipeline with AI agents
**Details**:
- Breakdown Agent: extract policy ideas from documents
- Research Agent: add context and background
- Position generation from processed content
- Processing status tracking and updates
- Integration with input document workflow
- Admin interface for triggering processing

### Phase 8: Testing & Polish

**T022: Component Unit Tests [P]**
**Path**: `src/components/**/*.test.tsx`
**Dependencies**: All component tasks (T003-T008)
**Parallel**: Yes (separate test files)
**Objective**: Test all UI components with React Testing Library
**Details**:
- Test component rendering and props
- Test user interactions (clicks, form inputs)
- Test accessibility features (ARIA labels, keyboard navigation)
- Test responsive behavior
- Mock external dependencies
- Achieve >80% component test coverage

**T023: API Route Tests [P]**
**Path**: `src/pages/api/**/*.test.ts`
**Dependencies**: All API tasks (T014-T016, T020-T021)
**Parallel**: Yes (separate test files)
**Objective**: Test all API endpoints with proper mocking
**Details**:
- Test request/response schemas
- Test authentication and authorization
- Test file upload functionality
- Test error handling and edge cases
- Mock external services (Claude API)
- Test database operations

**T024: End-to-End Tests [P]**
**Path**: `tests/e2e/`
**Dependencies**: T011 (full application)
**Parallel**: Yes (E2E test suite)
**Objective**: Test complete user workflows with Playwright
**Details**:
- Test public site navigation and search
- Test input submission workflow
- Test admin login and position management
- Test responsive design on different devices
- Test accessibility with automated tools
- Test performance benchmarks (<2s page load)

**T025: Design System Validation [P]**
**Path**: Visual regression tests, accessibility audit
**Dependencies**: T002, T003 (design implementation)
**Parallel**: Yes (validation suite)
**Objective**: Ensure design system compliance and accessibility
**Details**:
- Visual regression tests for component consistency
- Color contrast validation (WCAG AA compliance)
- Typography hierarchy verification
- Responsive design testing across breakpoints
- Finnish content review and tone validation
- Performance optimization and bundle size analysis

---

## Parallel Execution Examples

### Early Visual Development (After T001 completes):
```bash
# These can run in parallel for immediate visual feedback:
Task T002: Design system setup
Task T003: Component library
Task T009: Sample data creation
Task T010: Markdown processing

# Command example:
claude-code tasks T002 T003 T009 T010 --parallel
```

### UI Development Phase:
```bash
# Visual components (different files):
Task T004: Layout shell
Task T006: Position cards
Task T007: Search interface
Task T008: Position detail page

# Command example:
claude-code tasks T004 T006 T007 T008 --parallel
```

### Backend Development Phase:
```bash
# API routes (separate endpoints):
Task T014: Authentication
Task T015: File upload
Task T016: Position management
Task T020: Claude API integration

# Command example:
claude-code tasks T014 T015 T016 T020 --parallel
```

### Testing Phase:
```bash
# All tests can run in parallel:
Task T022: Component tests
Task T023: API tests
Task T024: E2E tests
Task T025: Design validation

# Command example:
claude-code tasks T022 T023 T024 T025 --parallel
```

---

## Dependencies Graph

```
T001 (Setup)
├── T002 (Tailwind + Design System)
│   ├── T003 (Component Library)
│   │   ├── T004 (Layout Shell)
│   │   │   └── T005 (Homepage)
│   │   ├── T006 (Position Cards) ── T007 (Search Results)
│   │   └── T008 (Position Detail)
│   │   └── T013 (Forms)
│   └── T025 (Design Validation)
├── T009 (Sample Data) [P]
├── T010 (Markdown Processing)
│   ├── T011 (Static Generation)
│   │   └── T012 (Client Search)
│   └── T016 (Position API)
├── T014 (Auth API)
│   ├── T017 (Admin Pages)
│   │   ├── T018 (Position Management)
│   │   └── T019 (Input Review)
├── T015 (Upload API) [P]
├── T020 (Claude API)
│   └── T021 (AI Processing)
└── T022, T023, T024 (Testing) [P]
```

## Critical Path for Visual Feedback

**Priority 1 (Days 1-3): Immediate Visual**
- T001 → T002 → T003 → T004 → T005
- Parallel: T009 (sample data)
- **Result**: Working homepage with design system

**Priority 2 (Days 4-7): Interactive Interface**
- T006 → T007 → T008 + T011 → T012
- **Result**: Full browsing and search experience

**Priority 3 (Days 8-14): Full Features**
- T013-T021 (forms, API, admin, AI)
- **Result**: Complete platform functionality

**Priority 4 (Days 15-21): Polish**
- T022-T025 (testing, validation, optimization)
- **Result**: Production-ready platform

---

**Total Tasks**: 25
**Parallel Tasks**: 15 (marked with [P])
**Estimated Duration**: 3 weeks with parallel execution
**Visual Feedback**: Available after Day 3 with working design system and homepage