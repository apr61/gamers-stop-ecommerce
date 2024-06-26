import { cn } from "@/utils/cn";
import {
  FC,
  InputHTMLAttributes,
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
} from "react";

type SelectProps = InputHTMLAttributes<HTMLSelectElement> &
  PropsWithChildren & {
    className?: string;
    label?: string;
  };

const SelectContext = createContext<SelectProps | undefined>(undefined);

const useSelectContext = (): SelectProps => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select component context cannot be rendered outside select ",
    );
  }
  return context;
};

const Select: FC<SelectProps> & { Option: FC<OptionProps> } = forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ className, children, value, ...props }: SelectProps, ref) => {
  return (
    <SelectContext.Provider value={{ value }}>
      <select
        ref={ref}
        className={cn(
          `w-full p-2 rounded-md cursor-pointer border border-border bg-accent`,
          className,
        )}
        value={value}
        {...props}
      >
        {children}
      </select>
    </SelectContext.Provider>
  );
}) as unknown as FC<SelectProps> & { Option: FC<OptionProps> };

type OptionProps = PropsWithChildren & InputHTMLAttributes<HTMLOptionElement>;

const Option: FC<OptionProps> = ({ value, children }) => {
  const { value: currentValue } = useSelectContext();
  return (
    <option
      value={value}
      className={`${currentValue === value ? "bg-primary" : ""}`}
    >
      {children}
    </option>
  );
};

Select.displayName = "Select";
Select.Option = Option;

export default Select;
