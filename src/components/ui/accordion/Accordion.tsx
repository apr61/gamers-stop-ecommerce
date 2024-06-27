import { ReactNode, useState } from "react";

type AccordionPropsType = {
  children: ReactNode;
  title: string;
  modifiedStyles?: string;
  defaultOpen?: boolean;
};

function Accordion({
  children,
  title,
  modifiedStyles,
  defaultOpen = false,
}: AccordionPropsType) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  return (
    <div className="p-2 border-b border-border last-of-type:border-none">
      <div
        className="flex justify-between cursor-pointer items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className={modifiedStyles ?? "font-semibold"}>{title}</h4>
        <span className="text-xl">{isExpanded ? "-" : "+"}</span>
      </div>
      {isExpanded && <div className="pl-2">{children}</div>}
    </div>
  );
}

export default Accordion;
