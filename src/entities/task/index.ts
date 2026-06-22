export {
  tasksReducer,
  taskAdded,
  taskToggled,
  taskRemoved,
  taskEdited,
  completedCleared,
  selectAllTasks,
  selectActiveCount,
  selectCompletedCount,
  selectVisibleTasks,
  initialState as tasksInitialState
} from './model/task.slice'
export type { TasksState } from './model/task.slice'
export type { Task, TaskFilter } from './model/task.types'
