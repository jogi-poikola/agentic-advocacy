# Research: AI-Powered Policy Platform

**Date**: 2025-09-17
**Feature**: AI-powered policy platform for advocacy organizations
**Context**: MVP for Tietopolitiikka.fi, 1-month timeline, beginner developer

## Technology Research Summary

### 1. Next.js Framework Choice
**Decision**: Next.js 14+ with App Router and static site generation
**Rationale**:
- Handles both static public site and API routes in single framework
- Excellent Vercel free hosting integration
- Built-in optimization for performance
- Strong TypeScript support with Claude Code
- Large community and documentation

**Alternatives Considered**:
- Separate React + Express: Rejected for deployment complexity
- Gatsby: Rejected for weaker API route support
- Vanilla React + Netlify Functions: Rejected for development complexity

**Best Practices**:
- Use App Router for modern Next.js patterns
- Implement static site generation for public pages
- Use API routes for file uploads and authentication
- Leverage built-in optimization (images, fonts, etc.)

### 2. AI Integration with Claude
**Decision**: Direct Anthropic Claude API integration with official SDK
**Rationale**:
- Simple HTTP API calls, no complex framework needed
- Direct control over prompts and responses
- Good documentation and TypeScript support
- Cost-effective for MVP scale

**Alternatives Considered**:
- LangChain: Rejected for MVP complexity and learning curve
- Local models: Rejected for hosting complexity and costs
- OpenAI: Rejected per user preference for Claude

**Best Practices**:
- Use environment variables for API keys
- Implement retry logic for API failures
- Create specialized prompts for each AI agent role
- Cache responses when appropriate to reduce costs

### 3. File-Based Storage Architecture
**Decision**: Markdown files with frontmatter, stored in Git
**Rationale**:
- Version control built-in with Git
- Human-readable and editable
- No database hosting costs or complexity
- Easy backup and migration
- Works well with static site generation

**Alternatives Considered**:
- PostgreSQL: Rejected for hosting costs and complexity
- SQLite: Rejected for multi-user access limitations
- JSON files: Rejected for poor human readability

**Best Practices**:
- Use frontmatter for structured metadata
- Implement file naming conventions
- Create indexes for fast search
- Use gray-matter library for parsing

### 4. Search Implementation
**Decision**: Fuse.js for client-side fuzzy search
**Rationale**:
- No server-side search infrastructure needed
- Scales well to thousands of documents
- Works offline after initial load
- Good relevance scoring and fuzzy matching
- Small bundle size impact

**Alternatives Considered**:
- Elasticsearch: Rejected for hosting complexity and costs
- PostgreSQL full-text search: Rejected (no database)
- Server-side search API: Rejected for additional complexity

**Best Practices**:
- Pre-build search index at build time
- Include position content, tags, and metadata in index
- Implement search result highlighting
- Provide search filters and sorting options

### 5. Authentication Strategy
**Decision**: Shared password with next-auth.js foundation
**Rationale**:
- Simple for MVP with small curator team
- next-auth.js provides extensible foundation
- Can easily add OAuth providers later
- Minimal setup and maintenance

**Alternatives Considered**:
- Individual user accounts: Rejected for MVP complexity
- Google OAuth only: Rejected for dependency on Google accounts
- No authentication: Rejected for security concerns

**Best Practices**:
- Use next-auth.js for session management
- Implement middleware for protecting admin routes
- Store credentials securely (environment variables)
- Plan migration path to individual accounts

### 6. Styling and UI Framework
**Decision**: Tailwind CSS with Tietopolitiikka.fi design system integration
**Rationale**:
- Utility-first approach good for beginners
- Excellent Next.js integration
- Fast development and consistent design
- Small production bundle with purging
- Perfect foundation for implementing design tokens

**Design System Requirements**:
- **Colors**: Primary Yellow (#ffde59), Purple (#5e17eb), Dark Gray (#383838)
- **Typography**: Unica One (headers), Lato (body text)
- **Accessibility**: WCAG AA compliance with 4.5:1 contrast ratios
- **Principles**: Collaborative, happy, trustworthy, minimal & modern
- **Language**: Finnish-first with formal, neutral tone

**Alternatives Considered**:
- CSS modules: Rejected for beginner complexity
- Styled-components: Rejected for runtime overhead
- Bootstrap: Rejected for larger bundle size and design constraints

**Best Practices**:
- Implement design tokens as Tailwind custom configuration
- Create component library matching Tietopolitiikka.fi visual identity
- Use accessibility-first responsive design (mobile: 0-640px, tablet: 641-1024px, desktop: 1025px+)
- Apply spacing scale (4/8/16/24/32/48px) consistently
- Ensure collaborative design principles in every UI element

### 7. Google Docs Integration
**Decision**: Google Drive API for file access and optional editing
**Rationale**:
- Familiar interface for curators
- Real-time collaboration capabilities
- Good API documentation and libraries
- Can complement file-based storage

**Alternatives Considered**:
- Custom WYSIWYG editor: Rejected for development time
- Direct markdown editing: Keep as backup option
- Other collaborative editors: Rejected for integration complexity

**Best Practices**:
- Use Google Drive API for reading documents
- Implement two-way sync between Docs and Markdown
- Handle authentication with service accounts
- Provide fallback to direct file editing

### 8. Testing Strategy
**Decision**: Jest + React Testing Library + Playwright for E2E
**Rationale**:
- Jest and RTL are Next.js defaults
- Playwright provides reliable E2E testing
- Good TypeScript support
- Extensive documentation and community

**Alternatives Considered**:
- Cypress: Rejected for slower execution
- Vitest: Rejected for ecosystem maturity
- Manual testing only: Rejected for quality concerns

**Best Practices**:
- Test user workflows, not implementation details
- Mock external APIs in unit tests
- Use E2E tests for critical user journeys
- Implement visual regression testing for UI components

## Development Environment Setup

### Required Tools
- Node.js 18+ (LTS recommended)
- Git for version control
- VS Code with TypeScript and Tailwind extensions
- Vercel CLI for deployment testing

### Environment Variables
```
ANTHROPIC_API_KEY=sk-...           # Claude API access
NEXTAUTH_SECRET=random-string      # Session encryption
NEXTAUTH_URL=http://localhost:3000 # Base URL
ADMIN_PASSWORD=secure-password     # Shared admin password
GOOGLE_CLIENT_ID=...               # Google Drive API
GOOGLE_CLIENT_SECRET=...           # Google Drive API
```

### File Structure Decisions
- Use `src/` directory for all application code
- Store data files in `src/data/` for easy static generation
- Keep tests alongside source files
- Use TypeScript strict mode from start

## Performance Considerations

### Target Metrics
- Page load: <2 seconds for public pages
- Search response: <500ms for 200+ positions
- File upload: Support 20MB files without timeout
- Concurrent users: 10-50 without degradation

### Optimization Strategies
- Static generation for all public pages
- Client-side search to reduce server load
- Image optimization with Next.js built-ins
- CDN delivery via Vercel Edge Network

## Security Considerations

### Data Protection
- No personal information in uploaded documents (user responsibility)
- Sanitize all user inputs before processing
- Use HTTPS for all communications
- Implement CSRF protection with next-auth.js

### Access Control
- Password-protected admin interface
- Session-based authentication
- API route protection middleware
- File access validation

## Deployment Strategy

### Hosting Platform
- Vercel free tier for MVP
- GitHub integration for automatic deployments
- Custom domain support when needed
- Environment variable management

### CI/CD Pipeline
- GitHub Actions for testing
- Automatic deployment on merge to main
- Preview deployments for feature branches
- Health checks after deployment

---

**Research Status**: ✅ Complete
**Next Phase**: Data model and contract design