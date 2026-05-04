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
  const createdAt = new Date(todo.createdAt).toLocaleString()

  return (
    <li className={todo.completed ? 'todo-item is-complete' : 'todo-item'}>
      <div className="todo-item__content">
        <div className="todo-item__body">
          <div className="todo-item__heading">
            <p className="todo-item__title">{todo.title}</p>
            <span className={`todo-item__priority priority-${todo.priority.toLowerCase()}`}>
              {todo.priority}
            </span>
          </div>
          <p className="todo-item__meta">{createdAt}</p>
        </div>
      </div>
      <div className="todo-item__actions">
        <button type="button" onClick={() => onToggle(todo.id)}>
          {toggleLabel}
        </button>
        <button type="button" className="delete-button" onClick={() => onDelete(todo.id)}>
          {`Delete ${todo.title}`}
        </button>
      </div>
    </li>
  )
}

export default TodoItem
