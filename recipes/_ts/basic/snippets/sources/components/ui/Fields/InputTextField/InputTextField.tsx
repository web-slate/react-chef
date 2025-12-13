import React, { ChangeEvent, FocusEvent } from 'react'

interface InputTextFieldProps {
  name: string
  initialValue?: string
  value?: string
  placeholder?: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
}

export default function InputTextField({
  name,
  initialValue = '',
  value,
  placeholder,
  handleChange,
  onBlur,
}: InputTextFieldProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
  }

  return (
    <div>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        value={value || initialValue}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}
