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
      <p className="filter-bar__label">View</p>
      <div className="filter-bar__controls">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={activeFilter === filter.value ? 'is-active filter-chip' : 'filter-chip'}
            aria-pressed={activeFilter === filter.value}
            onClick={() => onChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
