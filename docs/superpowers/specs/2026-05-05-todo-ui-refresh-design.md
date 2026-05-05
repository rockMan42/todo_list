# Todo UI Refresh Design

## Overview

Refresh the existing Code Todo Reminder interface so it feels visually polished, modern, and intentionally product-like without changing the underlying feature set.

The approved direction is a "Deep Blue Control Panel" aesthetic:

- Dark navy workspace background
- Frosted deep-surface card treatment
- Ice-blue primary accents
- Cleaner status colors with lower visual noise

This is a visual redesign only. Todo behavior, component structure, and storage logic remain unchanged.

## Goals

- Replace the current warm beige palette with a more premium cool-toned system
- Improve hierarchy so the page feels more like a cohesive product UI
- Keep the interface readable for repeated daily use
- Preserve the app's lightweight single-page workflow

## Non-Goals

- No changes to todo creation, filtering, persistence, or actions
- No component restructuring beyond what styling needs
- No animation-heavy redesign
- No dark/light theme switcher in this pass

## Product Direction

The UI should feel like an internal developer control panel rather than a lifestyle app or a playful consumer tool.

The visual tone should be:

- Focused
- Technical
- Calm
- High-contrast without harshness

The redesign should avoid generic neon-cyber styling. The target is refined software polish, not a flashy sci-fi mockup.

## Visual System

### 1. Page Background

The page background should move from flat warm tones to a layered dark-blue atmosphere:

- Deep navy base
- Subtle radial highlight near the top
- Gentle tonal falloff to create depth

This should make the main card feel anchored rather than floating on a plain background.

### 2. Surface Hierarchy

Use a clear three-level surface system:

- `bg`: application backdrop
- `panel`: primary app card
- `surface`: controls and todo rows

Each level should have enough separation to read clearly in a dark UI, using both tone and border contrast rather than heavy shadows alone.

### 3. Accent Strategy

Use ice blue as the primary accent for:

- Primary button emphasis
- Selected filter state
- Focus rings or active borders where helpful

Accent usage should be disciplined. The goal is to guide attention, not flood the page with bright color.

### 4. Status Colors

Priority chips should retain semantic distinction:

- `P1`: restrained red-rose
- `P2`: amber-gold
- `P3`: cool blue

These colors should be softened into tinted dark-surface badges instead of loud flat pills.

### 5. Typography

Keep the current overall structure, but make the text feel sharper:

- Stronger heading contrast
- Cleaner muted copy
- Better spacing rhythm between title, subtitle, controls, and list

Typography should support a professional dashboard feel rather than an editorial serif personality.

## Component Changes

### App Shell

- Increase environmental depth with a layered dark background
- Keep the content centered
- Preserve mobile-safe padding

### Main Card

- Shift to a dark translucent panel
- Use a cooler border color
- Add a softer, more premium shadow
- Slightly increase the sense of containment and polish

### Input Area

- Dark inputs with brighter text and subtle inset feel
- Stronger primary button treatment
- Better hover/focus feedback

The add button should read as the main call to action immediately.

### Filter Bar

- Inactive buttons should visually recede
- Active filter should use accent tint plus stronger border and text contrast
- Hover states should feel crisp but understated

### Todo Items

- Each row should feel like a contained module inside the panel
- Borders should be visible but soft
- Completed items should become visually muted without becoming hard to read

### Action Buttons

- Secondary action buttons stay low-emphasis
- Delete action keeps semantic warning color but should not dominate the row

## Interaction States

The redesign should improve state clarity for:

- Hover
- Focus
- Active filter
- Completed todo
- Empty list

Focus treatment should be keyboard-friendly and visible against dark surfaces.

## Responsiveness

The current mobile layout remains valid:

- Input stack collapses to one column on small screens
- Todo rows can still switch to vertical layout

The redesign must preserve readability and tap targets on mobile widths.

## Technical Plan

Implementation should stay CSS-first and localized to the current styling structure:

- Update color and typography tokens in `src/index.css`
- Refresh layout and component-level styling in `src/App.css`
- Avoid logic changes in React components unless a small semantic class hook is needed for styling

## Testing Strategy

Verification should confirm:

- Existing behavior tests still pass
- Build output succeeds
- The UI remains readable in both desktop and mobile layouts

## Success Criteria

The redesign succeeds if the page feels noticeably more premium and cohesive at a glance while remaining fast, simple, and easy to use as a daily todo utility.
