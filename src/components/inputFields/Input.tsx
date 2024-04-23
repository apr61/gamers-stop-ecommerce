import React, { useId } from "react";
import "./input.css";

type InputPropsType = {
  labelName?: string;
  placeholder: string;
  inputType?: string;
  value: string;
  required?: boolean;
  readOnly?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  ({
    labelName = '',
    placeholder,
    inputType = "text",
    value,
    required = true,
    readOnly = false,
  }, ref) => {
    const id = useId();

    return (
      <div className="input-group">
        <label htmlFor={id} className="input-group__label">
          {labelName}
        </label>
        <input
          className="input-group__input"
          type={inputType}
          placeholder={placeholder}
          id={id}
          ref={ref}
          defaultValue={value}
          required={required}
          readOnly={readOnly}
        />
      </div>
    );
  }
);

export default Input;
