import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Task } from '@/entities/task'
import { makeTestStore, renderWithProviders } from '@/app/testing/renderWithProviders'
import { ClearCompletedButton } from './ClearCompletedButton'

const withCompleted: Task[] = [
  { id: '1', text: 'Finished', completed: true },
  { id: '2', text: 'Still open', completed: false }
]

describe('ClearCompletedButton', () => {
  it('removes the completed tasks when clicked', async () => {
    const user = userEvent.setup()
    const store = makeTestStore({ tasks: { items: withCompleted } })
    renderWithProviders(<ClearCompletedButton />, { store })

    const button = screen.getByRole('button', { name: /clear completed/i })
    expect(button).toBeEnabled()

    await user.click(button)

    const remaining = store.getState().tasks.items
    expect(remaining).toHaveLength(1)
    expect(remaining[0].id).toBe('2')
  })

  it('is disabled when there is nothing completed to clear', () => {
    const store = makeTestStore({
      tasks: { items: [{ id: '2', text: 'Still open', completed: false }] }
    })
    renderWithProviders(<ClearCompletedButton />, { store })

    expect(screen.getByRole('button', { name: /clear completed/i })).toBeDisabled()
  })
})
