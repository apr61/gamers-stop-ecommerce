import React, { useId } from "react";
import "./input.css";

type InputPropsType = {
  label?: string;
  placeholder: string;
  type?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  ({
    label = '',
    placeholder,
    type = "text",
    ...props
  }, ref) => {
    const id = useId();

    return (
      <div className="input-group">
        <label htmlFor={id} className="input-group__label">
          {label}
        </label>
        <input
          className="input-group__input"
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
