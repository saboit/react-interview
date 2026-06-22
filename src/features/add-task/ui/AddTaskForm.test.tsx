import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeTestStore, renderWithProviders } from '@/app/testing/renderWithProviders'
import { AddTaskForm } from './AddTaskForm'

describe('AddTaskForm', () => {
  it('adds a task and clears the input on submit', async () => {
    const user = userEvent.setup()
    const store = makeTestStore({ tasks: { items: [] } })
    renderWithProviders(<AddTaskForm />, { store })

    const input = screen.getByRole('textbox', { name: 'New task' })
    await user.type(input, 'Ship the feature')
    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(store.getState().tasks.items).toHaveLength(1)
    expect(store.getState().tasks.items[0].text).toBe('Ship the feature')
    expect(input).toHaveValue('')
  })

  it('ignores empty submissions', async () => {
    const user = userEvent.setup()
    const store = makeTestStore({ tasks: { items: [] } })
    renderWithProviders(<AddTaskForm />, { store })

    await user.click(screen.getByRole('button', { name: 'Add' }))

    expect(store.getState().tasks.items).toHaveLength(0)
  })
})
