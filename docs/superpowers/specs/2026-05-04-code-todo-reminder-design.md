# Code Todo Reminder Design

## Overview

Build a lightweight personal coding todo reminder tool with React. The first version is intentionally minimal: fast capture, clear priority, easy completion, and reliable local persistence without a backend.

## Goals

- Let the user quickly record code-related follow-up tasks during development
- Make open items visible through a simple list-based reminder experience
- Keep the interaction lightweight enough to use as a daily personal tool

## Non-Goals

- User accounts or authentication
- Cloud sync or multi-device collaboration
- Calendar or notification-based reminders
- Drag-and-drop ordering
- Complex tags, file-path linking, or long-form notes

## Product Direction

The first version follows the approved "Minimal List" direction:

- Personal code todo tool
- Reminder style is list-and-status based, not time-based
- Interaction style is minimal and fast rather than dashboard-heavy

## Core Features

### 1. Quick Add

The user can enter a todo title, choose a priority, and press Enter or click an add button to create an item immediately.

### 2. Priority Levels

Each todo supports one of three priorities:

- `P1`
- `P2`
- `P3`

Priority is used for visual emphasis and filtering.

### 3. Completion Toggle

Each todo can be toggled between:

- Open
- Completed

Completed items remain visible when appropriate filters are active, but appear visually subdued.

### 4. Simple Filters

The UI includes four filter views:

- All
- Open
- Completed
- High Priority

High Priority maps to `P1` items.

### 5. Local Persistence

Todos are stored in browser `localStorage` so the list survives refreshes without a backend.

## Page Structure

The application is a single-page workspace with four sections:

### Header

Displays the product name and a short helper sentence describing the purpose of the tool.

### Quick Add Area

Contains:

- Todo title input
- Priority selector
- Add action

This area should support fast entry with minimal friction.

### Filter Bar

Contains the four filter modes:

- All
- Open
- Completed
- High Priority

The active filter should be visually distinct.

### Todo List

Each item displays:

- Title
- Priority badge
- Created time
- Complete/restore action
- Delete action

Completed items should have reduced visual emphasis, such as lower opacity or a struck-through title.

## Visual Design

The UI should feel like a practical developer utility:

- Light background with strong text contrast
- Clean spacing and restrained decoration
- Priority highlighted with clear accent colors
- No dependency on a component library

The visual goal is durable everyday usability rather than flashy presentation.

## Technical Plan

### Stack

- React
- Vite
- TypeScript

### Component Structure

- `App`
- `TodoInput`
- `FilterBar`
- `TodoList`
- `TodoItem`

### Data Model

Each todo item includes:

- `id: string`
- `title: string`
- `priority: 'P1' | 'P2' | 'P3'`
- `completed: boolean`
- `createdAt: string`

### State Management

Use React built-in state for the first version. Persist state changes to `localStorage`.

### Styling

Use project-local CSS rather than a UI framework. Keep styles centralized and easy to evolve.

## Behavior Details

### Add Flow

- User types a title
- User chooses a priority
- User submits the form
- Empty titles are rejected
- New todos are added to the list immediately

### Completion Flow

- User marks an item completed
- Item state updates immediately
- Completed styling is applied
- User can restore the item back to open

### Delete Flow

- User can delete an item directly from the list
- Deletion takes effect immediately

### Filtering Flow

- Switching filters updates the visible list in place
- Filter behavior is client-side only

## Error Handling

The first version should keep error handling simple:

- Prevent empty todo submissions
- If `localStorage` contains invalid data, fall back to an empty list

No additional recovery UI is required for v1.

## Testing Strategy

The implementation should be verified against these outcomes:

- A todo can be added
- A todo can be marked completed
- A completed todo can be restored
- A todo can be deleted
- Filters show the expected subsets
- Refreshing the page keeps saved todos

## Success Criteria

The first version is successful if it allows a developer to capture and manage personal code follow-up items in under a few seconds per interaction, with no backend setup and no lost data on refresh.
