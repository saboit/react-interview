import { selectAllTasks } from '@/entities/task'
import { useAppSelector } from '@/shared/lib/redux'
import './TaskStats.css'

export const TaskStats = () => {
  const tasks = useAppSelector(selectAllTasks)
  const remaining = tasks.length

  return (
    <p className='task-stats' data-testid='task-stats'>
      <strong className='task-stats__count'>{remaining}</strong>{' '}
      {remaining === 1 ? 'task' : 'tasks'} left
    </p>
  )
}
