import classNames from 'classnames'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  children: ReactNode
}

export const Button = ({ variant = 'primary', className, children, ...rest }: ButtonProps) => (
  <button
    type='button'
    {...rest}
    className={classNames('tb-button', `tb-button--${variant}`, className)}
  >
    {children}
  </button>
)
