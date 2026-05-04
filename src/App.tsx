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

  return (
    <main className="app-shell">
      <section className="app-card">
        <h1>Code Todo Reminder</h1>
        <p className="app-subtitle">Add, filter, finish, and restore small code follow-ups.</p>
        <TodoInput onAdd={handleAddTodo} />
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
