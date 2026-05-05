import { StrictMode } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import App from './App'

const TODO_STORAGE_KEY = 'code-todo-items'

function renderApp() {
  const user = userEvent.setup()
  const view = render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  return { user, ...view }
}

async function addTodo(
  user: ReturnType<typeof userEvent.setup>,
  {
    title = 'Ship parser cleanup',
    priority = 'P2',
  }: { title?: string; priority?: 'P1' | 'P2' | 'P3' } = {},
) {
  const titleInput = screen.getByPlaceholderText('Capture a loose end...')

  fireEvent.change(titleInput, { target: { value: title } })
  await user.selectOptions(screen.getByLabelText('Priority'), priority)
  await user.click(screen.getByRole('button', { name: 'Add to board' }))
  return { title, priority }
}

function getTodoRow(title: string) {
  const row = screen.getByText(title).closest('li')

  expect(row).not.toBeNull()
  return row as HTMLLIElement
}

describe('App todo behavior', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('renders the editorial hero copy and default summary metrics', () => {
    renderApp()

    expect(
      screen.getByRole('heading', { name: 'Clear the loose ends.' }),
    ).toBeInTheDocument()

    const overview = screen.getByLabelText('Todo overview')

    expect(within(overview).getByText('Total notes')).toBeInTheDocument()
    expect(within(overview).getByText('Open loops')).toBeInTheDocument()
    expect(within(overview).getByText('High priority')).toBeInTheDocument()
    expect(within(overview).getAllByText('0')).toHaveLength(3)
  })

  test('adds a todo and displays it in the list', async () => {
    const { user } = renderApp()

    const { title, priority } = await addTodo(user, {
      title: 'P1 bug',
      priority: 'P1',
    })

    const todoRow = getTodoRow(title)

    expect(within(todoRow).getByText(title)).toBeInTheDocument()
    expect(within(todoRow).getByText(priority)).toBeInTheDocument()
  })

  test('completes a todo with a title-specific action', async () => {
    const { user } = renderApp()
    const { title } = await addTodo(user, { title: 'Fix lint rule' })

    await user.click(
      screen.getByRole('button', { name: `Complete ${title}` }),
    )

    const todoRow = getTodoRow(title)

    expect(
      within(todoRow).queryByRole('button', { name: `Complete ${title}` }),
    ).not.toBeInTheDocument()
    expect(
      within(todoRow).getByRole('button', { name: `Restore ${title}` }),
    ).toBeInTheDocument()
  })

  test('restores a completed todo with a title-specific action', async () => {
    const { user } = renderApp()
    const { title } = await addTodo(user, { title: 'Restore data flow' })

    await user.click(
      screen.getByRole('button', { name: `Complete ${title}` }),
    )
    await user.click(
      screen.getByRole('button', { name: `Restore ${title}` }),
    )

    const todoRow = getTodoRow(title)

    expect(
      within(todoRow).getByRole('button', { name: `Complete ${title}` }),
    ).toBeInTheDocument()
    expect(
      within(todoRow).queryByRole('button', { name: `Restore ${title}` }),
    ).not.toBeInTheDocument()
  })

  test('deletes a todo with a title-specific action', async () => {
    const { user } = renderApp()
    const { title } = await addTodo(user, { title: 'Delete stale code' })

    const todoItem = screen.getByText(title).closest('li') ?? document.body

    await user.click(screen.getByRole('button', { name: `Delete ${title}` }))

    expect(within(todoItem).queryByText(title)).not.toBeInTheDocument()
  })

  test('filters the list to only high-priority todos', async () => {
    const { user } = renderApp()

    await addTodo(user, { title: 'Ship P1 feature', priority: 'P1' })
    await addTodo(user, { title: 'Polish P3 detail', priority: 'P3' })

    await user.click(screen.getByRole('button', { name: 'High Priority' }))

    expect(screen.getByText('Ship P1 feature')).toBeInTheDocument()
    expect(screen.queryByText('Polish P3 detail')).not.toBeInTheDocument()
  })

  test('updates summary metrics after adding and completing todos', async () => {
    const { user } = renderApp()

    await addTodo(user, { title: 'Ship review polish', priority: 'P1' })
    await addTodo(user, { title: 'Refine empty state', priority: 'P3' })
    await user.click(
      screen.getByRole('button', { name: 'Complete Ship review polish' }),
    )

    const overview = screen.getByLabelText('Todo overview')
    const metricGroups = within(overview).getAllByRole('listitem')

    expect(within(metricGroups[0]).getByText('2')).toBeInTheDocument()
    expect(within(metricGroups[1]).getByText('1')).toBeInTheDocument()
    expect(within(metricGroups[2]).getByText('1')).toBeInTheDocument()
  })

  test('persists a completed todo to local storage and rehydrates it after a remount', async () => {
    const { user, unmount } = renderApp()
    const { title, priority } = await addTodo(user, {
      title: 'Persist completed review notes',
      priority: 'P1',
    })

    await user.click(
      screen.getByRole('button', { name: `Complete ${title}` }),
    )

    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toContain(title)
    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toContain(priority)
    expect(window.localStorage.getItem(TODO_STORAGE_KEY)).toContain('true')

    unmount()

    renderApp()

    const todoRow = getTodoRow(title)

    expect(within(todoRow).getByText(priority)).toBeInTheDocument()
    expect(
      within(todoRow).getByRole('button', { name: `Restore ${title}` }),
    ).toBeInTheDocument()
  })
})
