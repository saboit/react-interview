import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Task } from '@/entities/task'
import { makeTestStore, renderWithProviders } from '@/app/testing/renderWithProviders'
import { TaskItem } from './TaskItem'

const task: Task = { id: 'x', text: 'Write tests', completed: false }

describe('TaskItem', () => {
  it('toggles the task completed state when the checkbox is clicked', async () => {
    const user = userEvent.setup()
    const store = makeTestStore({ tasks: { items: [task] } })
    renderWithProviders(<TaskItem task={task} />, { store })

    await user.click(screen.getByRole('checkbox', { name: 'Toggle Write tests' }))

    expect(store.getState().tasks.items[0].completed).toBe(true)
  })
})
