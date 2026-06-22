import classNames from 'classnames'
import { useState } from 'react'
import { taskEdited, taskRemoved, type Task } from '@/entities/task'
import { useAppDispatch } from '@/shared/lib/redux'
import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { TextInput } from '@/shared/ui/TextInput'
import './TaskItem.css'

export interface TaskItemProps {
  task: Task
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const startEditing = () => {
    setDraft(task.text)
    setIsEditing(true)
  }

  const commitEditing = () => {
    const trimmed = draft.trim()
    if (trimmed) {
      dispatch(taskEdited({ id: task.id, text: trimmed }))
    }
    setIsEditing(false)
  }

  return (
    <li className='task-item' data-testid={`task-${task.id}`}>
      <Checkbox checked={task.completed} aria-label={`Toggle ${task.text}`} />

      {isEditing ? (
        <TextInput
          autoFocus
          value={draft}
          aria-label='Edit task'
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              commitEditing()
            }
          }}
        />
      ) : (
        <span
          className={classNames('task-item__label', {
            'task-item__label--done': task.completed
          })}
          onDoubleClick={startEditing}
        >
          {task.text}
        </span>
      )}

      <Button
        variant='danger'
        aria-label={`Delete ${task.text}`}
        onClick={() => dispatch(taskRemoved(task.id))}
      >
        Delete
      </Button>
    </li>
  )
}
