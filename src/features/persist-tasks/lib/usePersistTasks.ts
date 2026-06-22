import { useEffect } from 'react'
import { selectAllTasks } from '@/entities/task'
import { useAppSelector } from '@/shared/lib/redux'

export const TASKS_STORAGE_KEY = 'task-board.tasks'

export const usePersistTasks = () => {
  const tasks = useAppSelector(selectAllTasks)

  useEffect(() => {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  }, [])
}
