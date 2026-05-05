# Editorial UI Refresh Design

## Overview

Refresh the Code Todo Reminder interface into a restrained editorial productivity surface. The product should feel more intentional and premium without changing its core behavior.

This redesign keeps the app lightweight and single-page, but upgrades the visual hierarchy, layout composition, and copy tone so the page feels closer to a polished productivity product than a default form-and-list utility.

## Approved Direction

The approved design direction is:

- Editorial hero layout
- Restrained tone rather than loud or playful
- Visual and copy refresh together

## Goals

- Make the page feel immediately more polished and memorable
- Create clearer hierarchy between capture, overview, filters, and task list
- Increase perceived quality without adding feature complexity
- Preserve fast task entry and list management

## Non-Goals

- No backend or data model changes
- No new task properties
- No animation-heavy redesign
- No feature expansion into notes, due dates, or collaboration

## Experience Direction

The page should feel like a compact desk for unresolved coding follow-ups:

- Warm editorial canvas
- Dark, confident typography
- Strong hero headline with a more product-like voice
- Clear contrast between the primary workspace and the summary panel
- Softer, more spacious task cards instead of plain utility rows

The tone should be premium and calm, not trendy or decorative.

## Layout

The page will be reorganized into two major bands.

### 1. Hero Band

The top section becomes the visual anchor of the page.

Left side:

- Eyebrow label
- Large editorial headline
- Short supporting copy
- Todo composer

Right side:

- Dark summary panel
- Total todo count
- Open todo count
- High-priority count
- Short helper line reinforcing the page purpose

### 2. Workspace Band

The lower section contains:

- A stronger filter control styled like segmented product navigation
- The task list rendered as refined cards with better spacing and grouping

## Copy Direction

Copy should move from descriptive utility language to concise product language.

Examples of the intended shift:

- Generic title becomes a short directional headline
- Helper text becomes more confident and purpose-led
- Empty state should sound clean and encouraging rather than blank
- Labels and button text should stay practical and easy to scan

## Component Changes

### App

- Introduce hero structure and overview metrics
- Split top and bottom sections
- Compute simple derived stats from existing todo state

### TodoInput

- Present the form as a composer inside the hero
- Improve label hierarchy and button treatment

### FilterBar

- Restyle into segmented controls with stronger active state

### TodoList and TodoItem

- Increase spacing and card polish
- Reorganize meta information and actions for stronger scanning
- Keep completed items visibly subdued without harming readability

## Visual System

### Color

- Background: warm off-white editorial field
- Panels: layered creams with a darker contrast block
- Accent: restrained terracotta/copper family
- Text: deep brown-charcoal rather than blue-gray

### Typography

- Serif headline for the hero
- Clean sans-serif for controls and body copy
- Larger type scale and tighter headline tracking

### Shape and Surface

- Large-radius panels
- Soft borders
- Controlled shadow depth
- More deliberate spacing rhythm

## Responsive Behavior

- On desktop, hero becomes a two-column composition
- On mobile, hero stacks cleanly with summary panel under the copy/composer
- Input and action controls collapse without losing clarity
- Task cards remain readable and balanced on narrow widths

## Testing Focus

Verify that the redesign does not regress:

- Adding a todo
- Toggling complete and restore
- Deleting a todo
- Filtering visible items
- Persisting state after refresh
- Basic readability on small screens

## Success Criteria

The redesign succeeds if the page feels substantially more premium and intentional at first glance while still behaving like a fast, dependable coding todo tool.
