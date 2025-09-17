# Design System: Tietopolitiikka.fi Policy Platform

**Version**: Draft 0.1
**Date**: September 2025
**Integration**: Next.js + Tailwind CSS implementation
**Target**: AI-powered policy platform for Finnish advocacy organization

## Design Principles

### 1. Collaborative
**Intent**: Every element should invite participation and transparency
**Implementation**:
- Clear call-to-action buttons for input submission
- Transparent position review processes
- Open commenting and feedback systems
- Visible contribution attribution

### 2. Happy
**Intent**: Use light, open layouts and bright yellow accent to convey positivity
**Implementation**:
- Generous whitespace and breathing room
- Primary yellow (#ffde59) for highlights and positive actions
- Light backgrounds with minimal shadows
- Uplifting microcopy and success messages

### 3. Trustworthy
**Intent**: Typography, spacing, and tone reinforce credibility and seriousness
**Implementation**:
- Formal Finnish language with neutral tone
- Consistent typography hierarchy
- Reliable information architecture
- Clear data sourcing and attribution

### 4. Minimal & Modern
**Intent**: Avoid clutter; prioritize clarity, white space, and functional hierarchy
**Implementation**:
- Search-first interface design
- Clean navigation with minimal options
- Functional iconography only
- Progressive disclosure of information

### 5. Accessibility-first
**Intent**: Every design decision must meet WCAG AA standards
**Implementation**:
- 4.5:1 minimum color contrast ratios
- 16px minimum font sizes
- Keyboard navigation support
- Screen reader optimization
- Alt text for all images

## Visual Identity

### Color Palette

#### Primary Colors
```css
:root {
  --color-primary-yellow: #ffde59;
  --color-primary-purple: #5e17eb;
  --color-primary-gray-dark: #383838;
}
```

**Usage Guidelines**:
- **Yellow (#ffde59)**: Highlights, CTAs, active states, success indicators
- **Purple (#5e17eb)**: Headers, logos, links, interactive elements
- **Dark Gray (#383838)**: Body text, navigation, footers

#### Neutral Colors
```css
:root {
  --color-neutral-white: #ffffff;
  --color-neutral-gray-light: #f5f5f5;
  --color-neutral-gray-medium: #cccccc;
}
```

**Usage Guidelines**:
- **White**: Backgrounds, cards, modal overlays
- **Light Gray**: Section backgrounds, subtle borders
- **Medium Gray**: Placeholder text, disabled states

#### Semantic Colors
```css
:root {
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### Typography

#### Font Stack
```css
/* Heading Font - Unica One */
@import url('https://fonts.googleapis.com/css2?family=Unica+One&display=swap');

/* Body Font - Lato */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');

:root {
  --font-heading: 'Unica One', sans-serif;
  --font-body: 'Lato', sans-serif;
}
```

#### Typography Scale
```css
:root {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
}
```

#### Typography Hierarchy
- **H1**: Unica One, 32px, purple (#5e17eb)
- **H2**: Unica One, 24px, gray-dark (#383838)
- **H3**: Unica One, 20px, gray-dark (#383838)
- **Body**: Lato, 16px, gray-dark (#383838)
- **Small**: Lato, 14px, gray-medium (#cccccc)
- **Caption**: Lato, 12px, gray-medium (#cccccc)

### Spacing System

#### Spacing Scale
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

#### Layout Guidelines
- **Container max-width**: 1200px
- **Section padding**: 48px vertical, 24px horizontal
- **Card padding**: 24px all sides
- **Button padding**: 12px vertical, 24px horizontal
- **Input padding**: 12px vertical, 16px horizontal

### Responsive Breakpoints

```css
:root {
  --breakpoint-sm: 640px;  /* Mobile landscape */
  --breakpoint-md: 768px;  /* Tablet portrait */
  --breakpoint-lg: 1024px; /* Tablet landscape */
  --breakpoint-xl: 1280px; /* Desktop */
}
```

**Design Approach**:
- Mobile-first responsive design
- Touch-friendly targets (minimum 44px)
- Flexible grid system
- Progressive enhancement

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--color-primary-purple);
  color: var(--color-neutral-white);
  font-family: var(--font-body);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: var(--text-base);
  transition: all 200ms ease;
}

.btn-primary:hover {
  background-color: #4c0dbf;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background-color: var(--color-neutral-gray-medium);
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary-purple);
  border: 2px solid var(--color-primary-yellow);
  font-family: var(--font-body);
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: var(--text-base);
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background-color: var(--color-primary-yellow);
  color: var(--color-primary-gray-dark);
}
```

### Forms

#### Input Fields
```css
.form-input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: 12px 16px;
  border: 2px solid var(--color-neutral-gray-light);
  border-radius: 8px;
  background-color: var(--color-neutral-white);
  transition: border-color 200ms ease;
  min-height: 44px; /* Touch-friendly */
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-purple);
  box-shadow: 0 0 0 3px rgba(94, 23, 235, 0.1);
}

.form-input.error {
  border-color: var(--color-error);
}
```

#### Labels and Help Text
```css
.form-label {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-primary-gray-dark);
  margin-bottom: 4px;
  display: block;
}

.form-help {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-neutral-gray-medium);
  margin-top: 4px;
}

.form-error {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-error);
  margin-top: 4px;
}
```

### Cards and Content

#### Position Card
```css
.position-card {
  background-color: var(--color-neutral-white);
  border: 1px solid var(--color-neutral-gray-light);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.position-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.position-card.priority-high {
  border-left: 4px solid var(--color-primary-purple);
}

.position-card.priority-medium {
  border-left: 4px solid var(--color-primary-yellow);
}

.position-card.priority-low {
  border-left: 4px solid var(--color-neutral-gray-medium);
}
```

#### Tag Pills
```css
.tag-pill {
  display: inline-block;
  background-color: var(--color-primary-yellow);
  color: var(--color-primary-gray-dark);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 16px;
  margin: 2px;
  text-decoration: none;
  transition: all 200ms ease;
}

.tag-pill:hover {
  background-color: var(--color-primary-purple);
  color: var(--color-neutral-white);
}
```

### Navigation

#### Search Bar
```css
.search-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  padding: 16px 24px 16px 48px;
  border: 3px solid var(--color-primary-yellow);
  border-radius: 24px;
  background-color: var(--color-neutral-white);
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-purple);
  box-shadow: 0 4px 12px rgba(94, 23, 235, 0.15);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-primary-purple);
  width: 20px;
  height: 20px;
}
```

### Iconography

#### Icon Guidelines
- Use simple line icons with 2px stroke width
- Icons should be 16px, 20px, or 24px in size
- Color: Purple (#5e17eb) for interactive, Gray (#383838) for informational
- Avoid decorative icons; focus on functional clarity

#### Common Icons
- **Search**: Magnifying glass
- **Filter**: Funnel/filter lines
- **Menu**: Three horizontal lines
- **Close**: X or cross
- **Success**: Checkmark
- **Error**: Exclamation triangle
- **Info**: Circle with "i"

## Finnish Content Guidelines

### Voice and Tone
- **Voice**: Formal, neutral, fact-based
- **Tone**: Trustworthy, respectful, collaborative
- **Language**: Finnish-first with English fallback

### Content Rules
- **Headings**: Clear and short (max 8 words)
- **Error messages**: Specific and solution-oriented
- **Success messages**: Brief confirmation ("Tallennettu onnistuneesti")
- **Placeholder text**: "Hae tietopolitiikan ehdotuksia..." (Search information policy proposals)

### Microcopy Examples
```
# Search
Placeholder: "Hae tietopolitiikan ehdotuksia..."
No results: "Ei tuloksia haulle '{query}'"
Loading: "Ladataan..."

# Forms
Required field: "Pakollinen kenttä"
File too large: "Tiedosto on liian suuri (max 20MB)"
Upload success: "Tiedosto ladattu onnistuneesti"

# Actions
Save: "Tallenna"
Cancel: "Peruuta"
Delete: "Poista"
Edit: "Muokkaa"
Publish: "Julkaise"
```

## Tailwind CSS Configuration

### Custom Theme Extension
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#ffde59',
          purple: '#5e17eb',
          'gray-dark': '#383838',
        },
        neutral: {
          white: '#ffffff',
          'gray-light': '#f5f5f5',
          'gray-medium': '#cccccc',
        }
      },
      fontFamily: {
        heading: ['Unica One', 'sans-serif'],
        body: ['Lato', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    }
  }
}
```

## Accessibility Implementation

### WCAG AA Requirements

#### Color Contrast
- **Normal text**: 4.5:1 minimum ratio
- **Large text**: 3:1 minimum ratio
- **UI components**: 3:1 minimum ratio

#### Keyboard Navigation
```css
/* Focus indicators */
*:focus {
  outline: 2px solid var(--color-primary-purple);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-purple);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### Screen Reader Support
```html
<!-- Semantic HTML structure -->
<main role="main">
  <section aria-labelledby="search-heading">
    <h2 id="search-heading">Hae tietopolitiikan ehdotuksia</h2>
    <input
      type="search"
      aria-label="Hakukenttä"
      placeholder="Hae tietopolitiikan ehdotuksia..."
    />
  </section>
</main>

<!-- ARIA labels for complex interactions -->
<button
  aria-expanded="false"
  aria-controls="filter-menu"
  aria-label="Avaa suodatinvalikko"
>
  Suodata
</button>
```

## Motion and Interaction

### Animation Guidelines
- **Duration**: 200-300ms for UI transitions
- **Easing**: ease-out for entry, ease-in for exit
- **Reduced motion**: Respect `prefers-reduced-motion`

```css
/* Transition utilities */
.transition-default {
  transition: all 200ms ease-out;
}

.transition-slow {
  transition: all 300ms ease-out;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Interaction States
- **Hover**: Subtle elevation and color change
- **Active**: Slight scale or position shift
- **Focus**: Clear outline indicator
- **Disabled**: Reduced opacity and no interaction

## Implementation Checklist

### MVP Phase ✅
- [ ] Color system implemented in Tailwind config
- [ ] Typography system with Unica One and Lato fonts
- [ ] Responsive grid system
- [ ] Component library: buttons, forms, cards
- [ ] Search interface with prominent placement
- [ ] Accessibility features: focus states, ARIA labels
- [ ] Finnish content with formal tone

### Post-MVP Enhancements
- [ ] Animation library with reduced motion support
- [ ] Advanced component variants
- [ ] Design token documentation
- [ ] Figma design system integration
- [ ] Localization system (Finnish → English → Swedish)
- [ ] User testing and iteration

---

**Status**: Ready for implementation
**Next**: Component development following this system