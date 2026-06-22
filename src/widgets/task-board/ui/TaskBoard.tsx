import { useState } from 'react'
import type { TaskFilter } from '@/entities/task'
import { AddTaskForm } from '@/features/add-task'
import { ClearCompletedButton } from '@/features/clear-completed'
import { TaskFilterBar } from '@/features/filter-tasks'
import { usePersistTasks } from '@/features/persist-tasks'
import { TaskList } from '@/features/task-list'
import { TaskStats } from '@/features/task-stats'
import './TaskBoard.css'

export const TaskBoard = () => {
  const [filter, setFilter] = useState<TaskFilter>('all')

  usePersistTasks()

  return (
    <section className='task-board'>
      <header className='task-board__header'>
        <h1 className='task-board__title'>Task Board</h1>
        <TaskStats />
      </header>

      <AddTaskForm />

      <div className='task-board__toolbar'>
        <TaskFilterBar value={filter} onChange={setFilter} />
        <ClearCompletedButton />
      </div>

      <TaskList filter={filter} />
    </section>
  )
}
