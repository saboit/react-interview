import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { taskAdded } from '@/entities/task'
import { makeTestStore } from '@/app/testing/renderWithProviders'
import { TASKS_STORAGE_KEY, usePersistTasks } from './usePersistTasks'

describe('usePersistTasks', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('writes the latest tasks to localStorage whenever they change', () => {
    const store = makeTestStore({ tasks: { items: [] } })
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    )
    renderHook(() => usePersistTasks(), { wrapper })

    act(() => {
      store.dispatch(taskAdded('Buy milk'))
    })

    const stored = JSON.parse(window.localStorage.getItem(TASKS_STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({ text: 'Buy milk', completed: false })
  })
})
