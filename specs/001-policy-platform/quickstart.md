# Quickstart Guide: AI-Powered Policy Platform

**Purpose**: Validate implementation and demonstrate core functionality
**Target**: Developers setting up the platform for the first time
**Duration**: 30-45 minutes for complete setup and testing

## Prerequisites

### Required Software
- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Version control for code and data
- **VS Code**: Recommended editor with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

### Environment Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jogi-poikola/agentic-advocacy.git
   cd agentic-advocacy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables** - Create `.env.local`:
   ```bash
   # Required for AI processing
   ANTHROPIC_API_KEY=sk-ant-your-key-here

   # Required for authentication
   NEXTAUTH_SECRET=your-random-secret-string-here
   NEXTAUTH_URL=http://localhost:3000

   # Required for admin access
   ADMIN_PASSWORD=secure-curator-password

   # Optional: Google Drive integration
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Verify setup**: Open [http://localhost:3000](http://localhost:3000)

## Core Functionality Tests

### Test 1: Public Site Access
**Objective**: Verify static site generation and public position display

**Steps**:
1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Verify homepage loads with search interface
3. Check that sample positions are displayed
4. Test search functionality with query "digital rights"
5. Click on a position to view detailed page

**Expected Results**:
- ✅ Homepage loads without errors
- ✅ Search returns relevant results
- ✅ Position detail pages display content correctly
- ✅ Navigation works between pages

### Test 2: Input Document Submission
**Objective**: Test stakeholder input collection workflow

**Steps**:
1. Navigate to `/submit` page
2. Fill out submission form:
   - **Title**: "Test Policy Brief"
   - **Type**: Organization
   - **Organization**: "Test Organization"
   - **File**: Upload test PDF (create simple PDF with policy content)
   - **GDPR Confirmation**: Check the box
3. Submit form
4. Verify success message and input ID generation

**Expected Results**:
- ✅ Form validates required fields
- ✅ File upload accepts PDF under 20MB
- ✅ Success response includes input ID
- ✅ Input document stored in `src/data/inputs/`

### Test 3: Curator Authentication
**Objective**: Verify admin access control

**Steps**:
1. Navigate to `/admin/login`
2. Enter incorrect password, verify rejection
3. Enter correct password from `ADMIN_PASSWORD`
4. Verify redirect to admin dashboard
5. Check access to curator-only features

**Expected Results**:
- ✅ Invalid password rejected with clear error
- ✅ Valid password grants access
- ✅ Session persists across page reloads
- ✅ Protected routes accessible after login

### Test 4: AI Processing Workflow
**Objective**: Test Claude API integration and position generation

**Steps**:
1. Login as curator (from Test 3)
2. Navigate to admin inputs list
3. Find uploaded test document
4. Click "Process with AI"
5. Monitor processing status
6. Review generated draft positions

**Expected Results**:
- ✅ Processing starts successfully
- ✅ Claude API returns structured response
- ✅ Draft positions created with proper metadata
- ✅ Positions linked to source input document

### Test 5: Position Management
**Objective**: Test curator workflow for position curation

**Steps**:
1. As curator, navigate to draft positions
2. Edit a draft position:
   - Update title and content
   - Add tags and category
   - Set dependencies to other positions
3. Save changes
4. Publish position (change status to public)
5. Verify position appears on public site

**Expected Results**:
- ✅ Position editing interface functional
- ✅ Changes saved with version history
- ✅ Status change updates public visibility
- ✅ Public site reflects published position

### Test 6: Search Functionality
**Objective**: Validate client-side search implementation

**Steps**:
1. On public site, use search bar
2. Test various queries:
   - Exact title matches
   - Tag-based searches
   - Content keywords
   - Partial matches
3. Test search filters (category, tags)
4. Verify search result relevance

**Expected Results**:
- ✅ Search returns results under 500ms
- ✅ Results ranked by relevance
- ✅ Highlights show matched terms
- ✅ Filters work correctly

## Performance Validation

### Load Testing
**Objective**: Verify performance under expected load

**Test Script** (save as `test-load.js`):
```javascript
// Simple load test - install: npm install -g artillery
// Run: artillery quick --count 10 --num 5 http://localhost:3000
console.log('Load test: 10 users, 5 requests each');
console.log('Expected: All requests complete under 2 seconds');
```

**Manual Testing**:
1. Open 5 browser tabs to different pages
2. Perform searches in each tab simultaneously
3. Monitor response times and resource usage

**Expected Results**:
- ✅ Concurrent requests handled smoothly
- ✅ Search remains responsive with multiple users
- ✅ Memory usage stable under load

### File Upload Testing
**Objective**: Test file size limits and processing

**Steps**:
1. Test file uploads at various sizes:
   - 1MB PDF: Should upload successfully
   - 10MB PDF: Should upload successfully
   - 25MB PDF: Should be rejected with clear error
2. Test various file types:
   - PDF: Accepted
   - DOCX: Accepted (if implemented)
   - TXT: Accepted
   - EXE: Should be rejected

## Data Validation

### File System Check
**Objective**: Verify data storage structure

**Commands**:
```bash
# Check data directory structure
ls -la src/data/

# Verify position files
find src/data/positions -name "*.md" | head -5

# Check metadata files
cat src/data/metadata/positions-index.json | jq '.total_positions'

# Verify input processing
ls -la src/data/inputs/
```

**Expected Structure**:
```
src/data/
├── positions/           # Position markdown files
├── inputs/             # Input document files
├── metadata/           # Search indexes and taxonomy
├── users/              # User management
└── agents/             # AI processing logs
```

### Content Validation
**Objective**: Ensure data integrity

**Steps**:
1. Open position markdown file in editor
2. Verify frontmatter structure matches schema
3. Check that position IDs are unique
4. Validate tag consistency across positions
5. Verify related position links are valid

## Troubleshooting

### Common Issues

**API Key Errors**:
```
Error: ANTHROPIC_API_KEY not found
```
- Solution: Add valid Claude API key to `.env.local`

**Build Failures**:
```
Error: Cannot find module 'fuse.js'
```
- Solution: Run `npm install` to install dependencies

**Authentication Issues**:
```
Error: Invalid session
```
- Solution: Clear browser cookies and re-login

**File Upload Failures**:
```
Error: File too large
```
- Solution: Verify file under 20MB, check server limits

### Performance Issues

**Slow Search**:
- Check search index size in browser dev tools
- Verify positions-index.json is properly generated
- Consider search result pagination

**Memory Usage**:
- Monitor with browser dev tools
- Check for memory leaks in React components
- Verify file uploads are properly cleaned up

## Success Criteria

### MVP Functionality ✅
- [ ] Public website loads and displays positions
- [ ] Search functionality works across positions
- [ ] Input document upload and storage
- [ ] Curator authentication and session management
- [ ] AI processing integration (Claude API)
- [ ] Position creation, editing, and publishing
- [ ] File-based data storage with Git versioning

### Performance Targets ✅
- [ ] Page load times under 2 seconds
- [ ] Search response under 500ms
- [ ] Support for 10-50 concurrent users
- [ ] File uploads up to 20MB processed successfully

### Data Integrity ✅
- [ ] All positions have valid frontmatter
- [ ] Related position links are functional
- [ ] Input documents properly linked to generated positions
- [ ] Search index stays synchronized with content

## Next Steps

After successful quickstart validation:

1. **Deploy to Vercel**: Connect GitHub repo for automatic deployments
2. **Configure Production Environment**: Set production environment variables
3. **Load Test Data**: Import initial positions and test inputs
4. **Set Up Monitoring**: Configure error tracking and performance monitoring
5. **User Training**: Prepare curator training materials

---

**Validation Status**: Ready for implementation
**Next Command**: `/tasks` to generate implementation tasks