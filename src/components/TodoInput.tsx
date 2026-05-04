import { useRef } from 'react'
import type { FormEvent } from 'react'
import type { TodoPriority } from '../types'

interface TodoInputProps {
  onAdd: (title: string, priority: TodoPriority) => void
}

function TodoInput({ onAdd }: TodoInputProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const priorityRef = useRef<HTMLSelectElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const title = titleRef.current?.value.trim() ?? ''
    const priority = (priorityRef.current?.value as TodoPriority | undefined) ?? 'P2'

    if (!title) {
      return
    }

    onAdd(title, priority)
    event.currentTarget.reset()
    titleRef.current?.focus()
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" placeholder="Add a code todo..." />
      <label className="todo-input__priority">
        <span>Priority</span>
        <select ref={priorityRef} aria-label="Priority" defaultValue="P2">
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>
      </label>
      <button type="submit">Add todo</button>
    </form>
  )
}

export default TodoInput
