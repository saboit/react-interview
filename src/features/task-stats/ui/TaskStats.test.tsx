import { screen } from '@testing-library/react'
import type { Task } from '@/entities/task'
import { makeTestStore, renderWithProviders } from '@/app/testing/renderWithProviders'
import { TaskStats } from './TaskStats'

const items: Task[] = [
  { id: '1', text: 'Done thing', completed: true },
  { id: '2', text: 'Open thing', completed: false },
  { id: '3', text: 'Another open thing', completed: false }
]

describe('TaskStats', () => {
  it('shows how many tasks are still left to do', () => {
    const store = makeTestStore({ tasks: { items } })
    renderWithProviders(<TaskStats />, { store })

    expect(screen.getByTestId('task-stats')).toHaveTextContent('2 tasks left')
  })
})
