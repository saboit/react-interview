import classNames from 'classnames'
import type { TaskFilter } from '@/entities/task'
import './TaskFilterBar.css'

export interface TaskFilterBarProps {
  value: TaskFilter
  onChange: (filter: TaskFilter) => void
}

const FILTERS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' }
]

export const TaskFilterBar = ({ value, onChange }: TaskFilterBarProps) => (
  <div className='task-filter-bar' role='group' aria-label='Filter tasks'>
    {FILTERS.map((filter) => (
      <button
        key={filter.key}
        type='button'
        aria-pressed={value === filter.key}
        className={classNames('task-filter-bar__option', {
          'task-filter-bar__option--active': value === filter.key
        })}
        onClick={() => onChange(filter.key)}
      >
        {filter.label}
      </button>
    ))}
  </div>
)
