import { useState, type FormEvent } from 'react'
import { taskAdded } from '@/entities/task'
import { useAppDispatch } from '@/shared/lib/redux'
import { Button } from '@/shared/ui/Button'
import { TextInput } from '@/shared/ui/TextInput'
import './AddTaskForm.css'

export const AddTaskForm = () => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      return
    }
    dispatch(taskAdded(trimmed))
    setText('')
  }

  return (
    <form className='add-task' onSubmit={onSubmit}>
      <TextInput
        value={text}
        placeholder='Add a task…'
        aria-label='New task'
        onChange={(event) => setText(event.target.value)}
      />
      <Button type='submit'>Add</Button>
    </form>
  )
}
