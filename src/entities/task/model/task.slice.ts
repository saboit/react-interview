import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { Task, TaskFilter } from './task.types'

export interface TasksState {
  items: Task[]
}

// Selectors are typed against the slice of state they own rather than importing
// the app-level RootState — this keeps the entity layer independent of `app`.
interface TasksRootState {
  tasks: TasksState
}

export const initialState: TasksState = {
  items: [
    { id: 't1', text: 'Read the README and get the app running', completed: true },
    { id: 't2', text: 'Run the test suite and read the failures', completed: false },
    { id: 't3', text: 'Pair on the first failing test', completed: false }
  ]
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload)
      },
      prepare: (text: string) => ({
        payload: { id: nanoid(), text, completed: false }
      })
    },
    taskToggled: (state, action: PayloadAction<string>) => {
      const task = state.items.find((item) => item.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
    taskRemoved: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    taskEdited: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const task = state.items.find((item) => item.id === action.payload.id)
      if (task) {
        task.text = action.payload.text
      }
    },
    completedCleared: (state) => {
      state.items = state.items.filter((item) => !item.completed)
    }
  }
})

export const { taskAdded, taskToggled, taskRemoved, taskEdited, completedCleared } = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer

export const selectAllTasks = (state: TasksRootState) => state.tasks.items

export const selectActiveCount = (state: TasksRootState) =>
  state.tasks.items.filter((item) => !item.completed).length

export const selectCompletedCount = (state: TasksRootState) =>
  state.tasks.items.filter((item) => item.completed).length

export const selectVisibleTasks = (state: TasksRootState, filter: TaskFilter) => {
  if (filter === 'active') {
    return state.tasks.items.filter((item) => !item.completed)
  }
  if (filter === 'completed') {
    return state.tasks.items.filter((item) => item.completed)
  }
  return state.tasks.items
}
