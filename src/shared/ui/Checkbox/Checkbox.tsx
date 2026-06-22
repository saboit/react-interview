import classNames from 'classnames'
import type { InputHTMLAttributes } from 'react'
import './Checkbox.css'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <label className={classNames('tb-checkbox', className)}>
    <input type='checkbox' className='tb-checkbox__input' {...rest} />
    {label ? <span className='tb-checkbox__label'>{label}</span> : null}
  </label>
)
