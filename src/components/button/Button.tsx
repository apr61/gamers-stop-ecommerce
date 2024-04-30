import "./button.css";

interface ButtonPropsType {
  text: string;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
}

const Button = ({
  text,
  type = "submit",
  isDisabled = false,
}: ButtonPropsType) => {
  return (
    <button
      type={type}
      className={`${isDisabled ? "button--gray" : ""} button`}
    >
      {text}
    </button>
  );
};

export default Button;
