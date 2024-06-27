import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    btnType?: "primary" | "outline" | "danger" | "ghost";
    loading?: boolean;
  };

const Button = ({
  children,
  disabled = false,
  className = "",
  btnType = "primary",
  type = "button",
  loading = false,
  ...props
}: ButtonProps) => {
  let baseClass =
    "hover:bg-opacity-90 rounded-md w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const styles = {
    primary: "px-2 py-1 bg-primary text-white hover:bg-primary/90",
    outline: "p-2 bg-transparent border border-border hover:bg-muted",
    danger: "py-2 bg-destructive text-white",
    ghost: "p-2 hover:bg-muted",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseClass, styles[btnType], className)}
      {...props}
    >
      {loading && (
        <div className="border-2 border-transparent w-4 h-4 rounded-full border-t-white border-l-white border-r-white animate-spin"></div>
      )}
      {children}
    </button>
  );
};

export default Button;
