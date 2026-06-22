import { configureStore } from '@reduxjs/toolkit'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { tasksReducer } from '@/entities/task'
import type { RootState } from '@/app/store/store'

export const makeTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: preloadedState as RootState | undefined
  })

export type TestStore = ReturnType<typeof makeTestStore>

interface ProviderOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: TestStore
}

export const renderWithProviders = (
  ui: ReactElement,
  { store = makeTestStore(), ...options }: ProviderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) }
}
