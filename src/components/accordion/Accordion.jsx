import './accordion.css'

import { RiArrowUpSLine } from 'react-icons/ri'
import { useState } from 'react'

function Accoridon({ children, title, modifiedStyles, defaultOpen }) {
    const [isExpanded, setIsExpanded] = useState(defaultOpen ?? false);
    return (
        <div className="accordion">
            <div className="accordion__top" onClick={(e) => setIsExpanded(!isExpanded)}>
                <h4 className={modifiedStyles ?? 'accordion__title'}>{title}</h4>
                <RiArrowUpSLine className={isExpanded ? 'accordion__arrow accordion__arrow--expanded' : 'accordion__arrow'} />
            </div>
            {isExpanded && (
                <div className="accordion__bottom">
                    {children}
                </div>
            )}

        </div>
    )
}

export default Accoridon