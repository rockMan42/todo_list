export type TodoPriority = 'P1' | 'P2' | 'P3'

export type TodoFilter = 'all' | 'open' | 'completed' | 'high'

export interface TodoItemData {
  id: string
  title: string
  priority: TodoPriority
  completed: boolean
  createdAt: string
}
