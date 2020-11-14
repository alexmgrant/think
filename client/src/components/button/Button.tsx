import React from 'react';

import './Button.css';

const Button = (props: any) => {
  const { type = 'button', disabled = false, onClick } = props;

  return (
    <button
      className="Button"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
