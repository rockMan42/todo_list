import { useEffect, useState } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { TodoFilter, TodoItemData, TodoPriority } from './types'
import { loadTodos, saveTodos } from './utils/storage'

function App() {
  const [todos, setTodos] = useState<TodoItemData[]>(() => loadTodos())
  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function handleAddTodo(title: string, priority: TodoPriority) {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ])
  }

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const visibleTodos = todos.filter((todo) => {
    switch (activeFilter) {
      case 'open':
        return !todo.completed
      case 'completed':
        return todo.completed
      case 'high':
        return todo.priority === 'P1'
      default:
        return true
    }
  })

  const totalCount = todos.length
  const openCount = todos.filter((todo) => !todo.completed).length
  const highPriorityCount = todos.filter((todo) => todo.priority === 'P1').length

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="app-eyebrow">Code Todo Reminder</p>
          <h1>Clear the loose ends.</h1>
          <p className="app-subtitle">
            Capture the follow-ups that appear mid-build, keep the important ones close,
            and clear your board without losing momentum.
          </p>
          <TodoInput onAdd={handleAddTodo} />
        </div>

        <aside className="overview-panel" aria-label="Todo overview">
          <p className="overview-panel__eyebrow">Today&apos;s board</p>
          <p className="overview-panel__lede">
            A calm snapshot of what still needs your attention before it slips out of
            view.
          </p>

          <ul className="overview-panel__metrics">
            <li>
              <span>Total notes</span>
              <strong>{totalCount}</strong>
            </li>
            <li>
              <span>Open loops</span>
              <strong>{openCount}</strong>
            </li>
            <li>
              <span>High priority</span>
              <strong>{highPriorityCount}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="workspace-panel">
        <div className="workspace-panel__header">
          <div>
            <p className="workspace-panel__eyebrow">Workspace</p>
            <h2>Task board</h2>
          </div>
          <p className="workspace-panel__summary">
            {visibleTodos.length} item{visibleTodos.length === 1 ? '' : 's'} in view
          </p>
        </div>

        <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
        <TodoList
          todos={visibleTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </section>
    </main>
  )
}

export default App
