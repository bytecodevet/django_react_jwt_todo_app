import React from 'react';

import './Input.css';

interface InputProps {
  type?: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder: string;
  disabled: boolean;
  title?: string;
  value?: string;
}

const Input: React.FC<InputProps> = (props) => {
  let {
    type = 'text',
    onChange,
    className,
    placeholder,
    disabled,
    title,
    value,
  } = props;

  if (title) className = 'input--error';

  if (className) className = 'input ' + className;
  else className = 'input';

  return (
    <input 
    title={title}
    type={type}
    onChange={onChange}
    className={className}
    disabled={disabled}
    placeholder={placeholder}
    value={value}
    />
  )
}

export default Input;