import React from 'react'
import './accountOrdersPage.css'

function AccountOrdersPage() {
    const [currentTab, setCurrentTab] = useState('all')
    return (
        <section className="orders main">
            <h2 className="orders__title">Your Orders</h2>
            <div className="orders__container">
                <div className="orders__tabs">
                    <button className="orders__tab" onClick={() => handleTab('all')}>All Orders</button>
                    <button className="orders__tab" onClick={() => handleTab('not-shipped')}>Yet To Be Shipped</button>
                    <button className="orders__tab" onClick={() => handleTab('cancelled')}>Cancelled Orders</button>
                </div>
            </div>
        </section>
    )
}

export default AccountOrdersPage