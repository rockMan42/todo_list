import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import App from './App'

const TODO_STORAGE_KEY = 'code-todo-items'

function renderApp() {
  const user = userEvent.setup()
  render(<App />)
  return { user }
}

async function addTodo(
  user: ReturnType<typeof userEvent.setup>,
  {
    title = 'Ship parser cleanup',
    priority = 'P2',
  }: { title?: string; priority?: 'P1' | 'P2' | 'P3' } = {},
) {
  await user.type(
    screen.getByPlaceholderText('Add a code todo...'),
    title,
  )
  await user.selectOptions(screen.getByLabelText('Priority'), priority)
  await user.click(screen.getByRole('button', { name: 'Add todo' }))
  return { title, priority }
}

describe('App todo behavior', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test('adds a todo and displays it in the list', async () => {
    const { user } = renderApp()

    const { title } = await addTodo(user, {
      title: 'Ship syntax highlighting',
      priority: 'P1',
    })

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText('P1')).toBeInTheDocument()
  })

  test('completes a todo with a title-specific action', async () => {
    const { user } = renderApp()
    const { title } = await addTodo(user, { title: 'Fix lint rule' })

    await user.click(
      screen.getByRole('button', { name: `Complete ${title}` }),
    )

    expect(screen.getByText(/completed/i)).toBeInTheDocument()
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

    expect(screen.queryByText(/completed/i)).not.toBeInTheDocument()
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

  test('loads persisted todos from local storage', () => {
    window.localStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'todo-1',
          title: 'Persisted code review follow-up',
          priority: 'P1',
          completed: false,
          createdAt: '2026-05-04T00:00:00.000Z',
        },
      ]),
    )

    render(<App />)

    expect(
      screen.getByText('Persisted code review follow-up'),
    ).toBeInTheDocument()
  })
})
