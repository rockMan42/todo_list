import type { TodoItemData } from '../types'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: TodoItemData[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="todo-list__empty">
        <p>No loose ends on the board.</p>
        <span>Add a follow-up above to keep the next important thing in sight.</span>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default TodoList
