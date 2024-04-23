import "./accordion.css";
import { ReactNode, useState } from "react";

type AccoridonPropsType = {
  children: ReactNode;
  title: string;
  modifiedStyles: string;
  defaultOpen: boolean;
};

function Accoridon({
  children,
  title,
  modifiedStyles,
  defaultOpen = false,
}: AccoridonPropsType) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  return (
    <div className="accordion">
      <div
        className="accordion__top"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className={modifiedStyles ?? "accordion__title"}>{title}</h4>
        <span className="accordian__indicator">{isExpanded ? "-" : "+"}</span>
      </div>
      {isExpanded && <div className="accordion__bottom">{children}</div>}
    </div>
  );
}

export default Accoridon;
