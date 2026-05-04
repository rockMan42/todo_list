import type { TodoItemData, TodoPriority } from '../types'

export const TODO_STORAGE_KEY = 'code-todo-items'

const priorities: TodoPriority[] = ['P1', 'P2', 'P3']

function isTodoItemData(value: unknown): value is TodoItemData {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Partial<TodoItemData>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    priorities.includes(candidate.priority as TodoPriority) &&
    typeof candidate.completed === 'boolean' &&
    typeof candidate.createdAt === 'string'
  )
}

export function loadTodos(): TodoItemData[] {
  try {
    const stored = window.localStorage.getItem(TODO_STORAGE_KEY)

    if (!stored) {
      return []
    }

    const parsed: unknown = JSON.parse(stored)

    return Array.isArray(parsed) ? parsed.filter(isTodoItemData) : []
  } catch {
    return []
  }
}

export function saveTodos(todos: TodoItemData[]) {
  window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
}
