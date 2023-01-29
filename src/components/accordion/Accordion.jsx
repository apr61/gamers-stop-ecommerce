import './accordion.css'

import { RiArrowUpSLine } from 'react-icons/ri'
import { useState } from 'react'

function Accoridon({ children, title }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="accordion">
            <div className="accordion-top" onClick={(e) => setIsExpanded(!isExpanded)}>
                <h4>{title}</h4>
                <RiArrowUpSLine className={isExpanded ? 'accordion-arrow expanded' : 'accordion-arrow'} />
            </div>
            {isExpanded && (
                <div className="accordion-bottom">
                    {children}
                </div>
            )}

        </div>
    )
}

export default Accoridon