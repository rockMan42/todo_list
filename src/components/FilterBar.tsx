import type { TodoFilter } from '../types'

interface FilterBarProps {
  activeFilter: TodoFilter
  onChange: (filter: TodoFilter) => void
}

const filters: Array<{ label: string; value: TodoFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Completed', value: 'completed' },
  { label: 'High Priority', value: 'high' },
]

function FilterBar({ activeFilter, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" aria-label="Todo filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={activeFilter === filter.value ? 'is-active' : undefined}
          aria-pressed={activeFilter === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar
