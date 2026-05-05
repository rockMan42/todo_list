import type { TodoItemData } from '../types'

interface TodoItemProps {
  todo: TodoItemData
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const toggleLabel = todo.completed
    ? `Restore ${todo.title}`
    : `Complete ${todo.title}`
  const createdAt = new Date(todo.createdAt).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <li className={todo.completed ? 'todo-item is-complete' : 'todo-item'}>
      <div className="todo-item__body">
        <div className="todo-item__heading">
          <p className="todo-item__title">{todo.title}</p>
          <span className={`todo-item__priority priority-${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </span>
        </div>
        <p className="todo-item__meta">Logged {createdAt}</p>
      </div>
      <div className="todo-item__actions">
        <button type="button" className="todo-item__button" onClick={() => onToggle(todo.id)}>
          {toggleLabel}
        </button>
        <button
          type="button"
          className="todo-item__button delete-button"
          onClick={() => onDelete(todo.id)}
        >
          {`Delete ${todo.title}`}
        </button>
      </div>
    </li>
  )
}

export default TodoItem
