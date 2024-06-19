import { ReactElement } from "react";
import "./button.css";

interface ButtonPropsType {
  text: string | ReactElement;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  btnType?: "normal" | "ghost" | "danger";
  onClick?: () => void;
}

const Button = ({
  text,
  type = "submit",
  isDisabled = false,
  btnType = "normal",
  ...props
}: ButtonPropsType) => {
  const buttonStyles =
    btnType === "normal"
      ? "button"
      : btnType === "danger"
      ? "button button--danger"
      : "button button--ghost";

  return (
    <button
      type={type}
      className={`${isDisabled ? "button--gray" : ""} ${buttonStyles}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
