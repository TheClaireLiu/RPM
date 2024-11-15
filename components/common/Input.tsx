"use client";

import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: string//'text' | 'number' | 'email' | 'password' | 'date'
  value: string
  placeholder: string
  disabled?: boolean
  autoFocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  value,
  placeholder,
  disabled,
  autoFocus=false,
  onChange,
}) => {
  return (
    <div className='text-left'>
      <label>{placeholder}</label>
      <input
        autoFocus={autoFocus}
        className='input'
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input