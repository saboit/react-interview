import { selectVisibleTasks, type TaskFilter } from '@/entities/task'
import { useAppSelector } from '@/shared/lib/redux'
import { TaskItem } from './TaskItem'
import './TaskList.css'

export interface TaskListProps {
  filter?: TaskFilter
}

export const TaskList = ({ filter = 'all' }: TaskListProps) => {
  const tasks = useAppSelector((state) => selectVisibleTasks(state, filter))

  if (tasks.length === 0) {
    return <p className='task-list__empty'>Nothing here yet.</p>
  }

  return (
    <ul className='task-list'>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </ul>
  )
}
