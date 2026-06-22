import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { taskRemoved, type Task } from '@/entities/task'
import { makeTestStore, renderWithProviders } from '@/app/testing/renderWithProviders'
import { TaskList } from './TaskList'

const tasks: Task[] = [
  { id: 'a', text: 'Alpha', completed: false },
  { id: 'b', text: 'Bravo', completed: false },
  { id: 'c', text: 'Charlie', completed: false }
]

describe('TaskList', () => {
  it('keeps the inline edit attached to the same task when an earlier task is removed', async () => {
    const user = userEvent.setup()
    const store = makeTestStore({ tasks: { items: tasks } })
    renderWithProviders(<TaskList />, { store })

    // Begin editing "Bravo".
    await user.dblClick(screen.getByText('Bravo'))
    expect(within(screen.getByTestId('task-b')).getByRole('textbox')).toBeInTheDocument()

    // Remove the task above it ("Alpha") while the edit is still open.
    act(() => {
      store.dispatch(taskRemoved('a'))
    })

    // The open editor must still belong to "Bravo" — it must not jump to "Charlie".
    expect(within(screen.getByTestId('task-b')).queryByRole('textbox')).toBeInTheDocument()
    expect(within(screen.getByTestId('task-c')).queryByRole('textbox')).not.toBeInTheDocument()
  })
})
