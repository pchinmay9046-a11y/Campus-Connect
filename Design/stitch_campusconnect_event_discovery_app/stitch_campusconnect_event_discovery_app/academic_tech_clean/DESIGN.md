---
name: Academic Tech Clean
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#474555'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#787586'
  outline-variant: '#c8c4d8'
  surface-tint: '#5543df'
  primary: '#5442de'
  on-primary: '#ffffff'
  primary-container: '#6d5ef8'
  on-primary-container: '#ffffff'
  inverse-primary: '#c5c0ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#a63628'
  on-tertiary: '#ffffff'
  tertiary-container: '#c74e3e'
  on-tertiary-container: '#fffeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c5c0ff'
  on-primary-fixed: '#140067'
  on-primary-fixed-variant: '#3c22c7'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#872015'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2rem
  space-xl: 3rem
---

## Brand & Style

This design system embodies an energetic, focused, and ultra-legible academic-tech aesthetic. It blends collegiate camaraderie with modern, high-velocity digital product design. 

The aesthetic is clean, structured, and vibrant:
- High contrast hierarchy balances vibrant purple energy with calm, stable slate neutrals.
- The interface feels optimistic, dependable, and swift, helping students discover, RSVP, and navigate university life without friction.
- Structural elements maintain strict geometric order paired with soft, inviting corner radii, evoking modern developer tools, curated student hubs, and high-performance collaboration software.

## Colors

The palette balances vibrancy and institutional legibility across all surfaces.

- **Primary Violet (`#6D5EF8`)**: Anchors primary actions, active tabs, highlights, and featured event tags. Communicates forward-thinking university culture.
- **Secondary Emerald (`#10B981`)**: Dedicated to verified registration status, open capacity counters, and success notifications.
- **Tertiary Coral (`#F97360`)**: Drives urgency, limited seat notifications, cancellation alerts, and deadlines.
- **Neutral Dark Navy (`#111827`)**: Governs high-emphasis body text, headlines, and primary iconography.
- **Muted Slate (`#475569`)**: Handles supporting metadata, event timestamps, locations, and structural labels.
- **Canvas (`#F8FAFC`)**: Provides a subtle, cool background that lets white card surfaces achieve crisp contrast without harsh glare.
- **Surface (`#FFFFFF`)**: Pure white reserved for cards, modals, sheets, and interactive controls.
- **Subtle Stroke (`#E2E8F0`)**: Low-contrast borders establishing strict layout boundaries without visual weight.

## Typography

The type system is powered by Plus Jakarta Sans across all display, body, and label roles to balance friendly campus approachability with contemporary geometric precision.

- **Headlines**: Semi-bold to extrabold weights with tight tracking (`-0.02em` to `-0.01em`) ensure high impact for event discovery banners, page titles, and modal headers.
- **Body**: Regular weights prioritize comfortable reading density for lengthy event descriptions, speaker bios, and schedule timelines.
- **Labels & Microcopy**: Rendered in medium and semi-bold weights with slight positive tracking on compact sizes to guarantee quick legibility on tags, date stamps, and ticket indicators.

## Layout & Spacing

A disciplined 8px grid guides horizontal and vertical cadences. Content layouts use responsive 12-column grids on desktop and tablet, collapsing down to 4-column structures on mobile devices.

- **Breakpoints**: 
  - Mobile: `< 640px` (4 columns, `margin-sm: 1rem`, `gutter-sm: 1rem`)
  - Tablet: `640px – 1024px` (8 columns, `margin: 1.5rem`, `gutter: 1.5rem`)
  - Desktop: `> 1024px` (12 columns, max-width `1280px` centered, `margin: 2rem`, `gutter: 1.5rem`)
- **Spacing Usage**:
  - `space-xs (8px)`: Icon-to-label gaps, tag internal padding, inline badge spacing.
  - `space-sm (16px)`: Form control gutters, button padding, compact card internal padding.
  - `space-md (24px)`: Standard card internal padding, grid gaps for list items.
  - `space-lg (32px)`: Section header offsets, module separation.
  - `space-xl (48px)`: Hero section padding and large visual tier demarcations.

## Elevation & Depth

Visual hierarchy is maintained primarily through surface separation, delicate boundary lines, and diffused ambient depth:

- **Border Base**: All resting surfaces (cards, sidebars, header bars) use a crisp 1px stroke of `#E2E8F0` against the `#F8FAFC` base canvas.
- **Resting Depth**: Cards rest flat with an ambient low-opacity shadow (`0 1px 3px 0 rgba(17, 24, 39, 0.04), 0 1px 2px -1px rgba(17, 24, 39, 0.02)`).
- **Interactive / Hover Depth**: Cards elevate smoothly on hover with a purple-tinted ambient drop (`0 10px 20px -3px rgba(109, 94, 248, 0.08), 0 4px 6px -4px rgba(17, 24, 39, 0.04)`) and a subtle border color shift to `#CBD5E1`.
- **Overlay & Popover Depth**: Modals, dropdown menus, and registration draw sheets utilize high-tier elevation (`0 20px 25px -5px rgba(17, 24, 39, 0.1), 0 8px 10px -6px rgba(17, 24, 39, 0.05)`) with a backdrop blur overlay (`rgba(17, 24, 39, 0.4)` with `backdrop-filter: blur(4px)`).

## Shapes

The geometric architecture is structured around deliberate corner treatment tiers:

- **Buttons & Form Fields**: 8px corner radius (`rounded-md` equivalent under scale 2) provides a firm, technical boundary that feels active and clickable.
- **Cards, Panels, and Sheets**: 12px corner radius balances structure with visual comfort for content encapsulation.
- **Pills, Badges, and Avatars**: Fully rounded (`9999px`) to immediately signal transient tags, status alerts, club categories, and user profiles.

## Components

### Buttons
- **Primary**: Background `#6D5EF8`, text `#FFFFFF`, border-radius 8px. Hover state deepens to `#5B4CE6`. Active state scales subtly (`transform: scale(0.99)`).
- **Secondary / Outline**: Background `#FFFFFF`, text `#111827`, border `1px solid #E2E8F0`. Hover triggers background `#F8FAFC` and border `#CBD5E1`.
- **Destructive**: Background `#F97360` with white text, or outline with `#F97360` text and border for secondary danger actions.
- **Sizes**: Medium (40px height, 16px horizontal padding), Large (48px height, 20px horizontal padding).

### Chips & Badges
- **Category Filter Chips**: 32px height, 9999px border-radius, background `#FFFFFF`, border `1px solid #E2E8F0`, text `#475569`. Active state transitions to background `#6D5EF8`, text `#FFFFFF`, and border `#6D5EF8`.
- **Status Badges**: Pill-shaped (`9999px`), 24px height, horizontal padding 10px. 
  - *Open / Registered*: Background `#ECFDF5`, text `#10B981`.
  - *Filling Fast / Waitlist*: Background `#FFF1F0`, text `#F97360`.
  - *Academic / Official*: Background `#EEF2FF`, text `#6D5EF8`.

### Cards (Events & Organizations)
- Built on `#FFFFFF` with 12px border-radius and 1px `#E2E8F0` stroke.
- Features high-contrast date badging (stacked day/month lockup), category chip, clear headline typography, and a metadata row (time, campus location, capacity indicator).
- Hover transitions elevate card position by 2px and illuminate ambient violet shadow.

### Form Inputs
- Height 44px, border-radius 8px, background `#FFFFFF`, border `1px solid #E2E8F0`.
- Text `#111827`, placeholder text `#94A3B8`.
- Focus state applies a crisp 1px stroke of `#6D5EF8` and a 3px ring of `rgba(109, 94, 248, 0.15)`.

### Checkboxes & Radio Buttons
- 20px square/circle with 6px radius for checkboxes and full radius for radios.
- Inactive: `#FFFFFF` with `1.5px solid #CBD5E1`.
- Active: Background `#6D5EF8` with pure white check/bullet icon.

### Event Capacity Bar
- 6px height progress indicator track in `#E2E8F0` with full radius.
- Active fill uses `#10B981` (standard) switching dynamically to `#F97360` when capacity exceeds 85%.

### Ticket / Pass Sheet
- Specialized registration confirmation component featuring a clean split-panel design with a subtle dotted divider, QR code display, and university organization lockup.