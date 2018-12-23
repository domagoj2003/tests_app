import React from "react";

const Button = ({
  className,
  data_toggle,
  data_target,
  aria_expanded,
  aria_controls,
  disabled,
  name,
  type,
  id,
  onClick
}) => (
  <button
    id={id}
    type={type}
    name={name}
    disabled={disabled}
    onClick={onClick}
    data-toggle={data_toggle}
    data-target={data_target}
    aria-expanded={aria_expanded}
    aria-controls={aria_controls}
    className={className}
  >
    {name}
  </button>
);

export default Button;
