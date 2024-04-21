import "./accordion.css";
import { useState } from "react";

function Accoridon({ children, title, modifiedStyles, defaultOpen }) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen ?? false);
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
