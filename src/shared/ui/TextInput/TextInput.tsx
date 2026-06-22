import classNames from 'classnames'
import { forwardRef, type InputHTMLAttributes } from 'react'
import './TextInput.css'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...rest }, ref) => (
    <input ref={ref} type='text' className={classNames('tb-text-input', className)} {...rest} />
  )
)

TextInput.displayName = 'TextInput'
