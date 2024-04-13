import React from 'react';

import Loader from '../Loader/Loader';
import './Button.css';

interface ButtonProps {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({className, onClick, disabled, children}) => {
  if (className) className = 'btn ' + className;
  else className = 'btn';

  return (
    <button
    className={className}
    onClick={onClick}
    disabled={disabled}>
      {
        disabled
        ? <Loader />
        : children
      }
    </button>
  )
}

export default Button;