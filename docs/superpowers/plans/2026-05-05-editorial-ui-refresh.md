# Editorial UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the todo page into a restrained editorial productivity layout with upgraded copy, hierarchy, and summary metrics while preserving all existing todo behavior.

**Architecture:** Keep the existing React data flow and localStorage persistence, but restructure `App` into a hero band plus workspace band. Update component markup only where needed to support stronger layout semantics, and centralize most visual changes in CSS so behavior stays stable.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, project-local CSS

---

### Task 1: Lock the new UI contract with tests

**Files:**
- Modify: `src/App.test.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Write failing tests for the editorial hero and summary panel**

```tsx
test('renders the editorial hero copy and default summary metrics', () => {
  renderApp()

  expect(
    screen.getByRole('heading', { name: 'Clear the loose ends.' }),
  ).toBeInTheDocument()
  expect(screen.getByText('Total notes')).toBeInTheDocument()
  expect(screen.getByText('Open loops')).toBeInTheDocument()
  expect(screen.getByText('High priority')).toBeInTheDocument()
  expect(screen.getByText('0')).toBeInTheDocument()
})

test('updates summary metrics after adding and completing todos', async () => {
  const { user } = renderApp()

  await addTodo(user, { title: 'Ship review polish', priority: 'P1' })
  await addTodo(user, { title: 'Refine empty state', priority: 'P3' })
  await user.click(screen.getByRole('button', { name: 'Complete Ship review polish' }))

  const statsPanel = screen.getByLabelText('Todo overview')

  expect(within(statsPanel).getByText('2')).toBeInTheDocument()
  expect(within(statsPanel).getByText('1')).toBeInTheDocument()
  expect(within(statsPanel).getAllByText('1')).toHaveLength(2)
})
```

- [ ] **Step 2: Run the targeted test file to verify it fails**

Run: `sh ./scripts/run-node-tool.sh ./node_modules/vitest/vitest.mjs run src/App.test.tsx`
Expected: FAIL because the new heading and overview panel do not exist yet.

- [ ] **Step 3: Keep existing behavior assertions intact while adapting helper queries only if markup changes**

```tsx
const titleInput = screen.getByPlaceholderText('Capture a loose end...')
```

- [ ] **Step 4: Run the targeted test file again after updates**

Run: `sh ./scripts/run-node-tool.sh ./node_modules/vitest/vitest.mjs run src/App.test.tsx`
Expected: still FAIL until implementation lands, but only on the new editorial expectations.

- [ ] **Step 5: Commit**

```bash
git add src/App.test.tsx
git commit -m "test: cover editorial todo dashboard"
```

### Task 2: Restructure the page shell and copy

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add derived metrics and hero/workspace sections in `App`**

```tsx
  const totalCount = todos.length
  const openCount = todos.filter((todo) => !todo.completed).length
  const highPriorityCount = todos.filter((todo) => todo.priority === 'P1').length
```

- [ ] **Step 2: Replace the single card layout with the approved editorial composition**

```tsx
<main className="app-shell">
  <section className="hero-panel">
    <div className="hero-copy">...</div>
    <aside className="overview-panel" aria-label="Todo overview">...</aside>
  </section>
  <section className="workspace-panel">...</section>
</main>
```

- [ ] **Step 3: Upgrade copy tone without changing product behavior**

```tsx
<p className="app-eyebrow">Code todo reminder</p>
<h1>Clear the loose ends.</h1>
<p className="app-subtitle">Capture the follow-ups...</p>
```

- [ ] **Step 4: Preserve filter and list wiring exactly as before**

```tsx
<FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
<TodoList todos={visibleTodos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
```

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: restructure todo page into editorial layout"
```

### Task 3: Refresh component markup for the new layout language

**Files:**
- Modify: `src/components/TodoInput.tsx`
- Modify: `src/components/FilterBar.tsx`
- Modify: `src/components/TodoList.tsx`
- Modify: `src/components/TodoItem.tsx`

- [ ] **Step 1: Update the composer copy and accessible labels in `TodoInput`**

```tsx
<input ref={titleRef} type="text" placeholder="Capture a loose end..." />
<span>Priority</span>
<button type="submit">Add to board</button>
```

- [ ] **Step 2: Add filter-bar wrapper semantics that support a segmented control look**

```tsx
<div className="filter-bar" aria-label="Todo filters">
  <p className="filter-bar__label">View</p>
  <div className="filter-bar__controls">...</div>
</div>
```

- [ ] **Step 3: Add a stronger empty state container in `TodoList`**

```tsx
return (
  <div className="todo-list__empty">
    <p>No loose ends on the board.</p>
    <span>Add a follow-up above to start tracking it.</span>
  </div>
)
```

- [ ] **Step 4: Reorganize each todo card into title/meta/actions zones without changing button names**

```tsx
<li className={todo.completed ? 'todo-item is-complete' : 'todo-item'}>
  <div className="todo-item__body">...</div>
  <div className="todo-item__actions">...</div>
</li>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/TodoInput.tsx src/components/FilterBar.tsx src/components/TodoList.tsx src/components/TodoItem.tsx
git commit -m "feat: refresh todo component copy and structure"
```

### Task 4: Implement the visual system in CSS

**Files:**
- Modify: `src/App.css`
- Modify: `src/index.css`

- [ ] **Step 1: Replace the old shell/card styles with hero/workspace layout styles**

```css
.app-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}
```

- [ ] **Step 2: Define the restrained editorial palette and typography tokens**

```css
:root {
  --bg: #efe5d6;
  --panel: rgba(251, 246, 238, 0.86);
  --text-h: #20150e;
  --accent: #a05332;
}
```

- [ ] **Step 3: Style the summary panel, segmented filters, composer, and todo cards**

```css
.overview-panel { ... }
.filter-chip.is-active { ... }
.todo-item { ... }
```

- [ ] **Step 4: Add mobile-specific stacking and control collapse rules**

```css
@media (max-width: 720px) {
  .hero-panel {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/App.css src/index.css
git commit -m "style: apply editorial todo dashboard theme"
```

### Task 5: Verify the redesign end to end

**Files:**
- Test: `src/App.test.tsx`

- [ ] **Step 1: Run the focused app tests**

Run: `sh ./scripts/run-node-tool.sh ./node_modules/vitest/vitest.mjs run src/App.test.tsx`
Expected: PASS

- [ ] **Step 2: Run the full test suite**

Run: `sh ./scripts/run-node-tool.sh ./node_modules/vitest/vitest.mjs run`
Expected: PASS

- [ ] **Step 3: Run a production build**

Run: `sh ./scripts/run-node-tool.sh ./node_modules/typescript/bin/tsc -b && sh ./scripts/run-node-tool.sh ./node_modules/vite/bin/vite.js build`
Expected: build completes and outputs the Vite production bundle.

- [ ] **Step 4: Review in the browser at `http://localhost:5173/`**

Expected: editorial hero, dark summary card, segmented filters, and refined todo cards render cleanly on desktop and mobile widths.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: verify editorial todo refresh"
```
