import React from 'react';

const Button = ({ className, onClick, type, disabled, text }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;