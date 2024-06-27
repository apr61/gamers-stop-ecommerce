import { cn } from "@/utils/cn";
import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ className, ...props }: TextAreaProps) => {
	return (
		<textarea
			className={cn(
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-md p-2 border border-input bg-background",
				className,
			)}
			{...props}
		/>
	);
};

export default TextArea;
