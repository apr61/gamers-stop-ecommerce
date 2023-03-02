import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrderContext } from '../../context/OrderContext'
import { createRouterPath, currencyFormatter, dateFormatter, firebaseTimestapFormatter } from '../../utils/utils'
import './accountOrdersPage.css'

function AccountOrdersPage() {
  const [currentTab, setCurrentTab] = useState('all')
  const { filteredOrders, loading, handleFilter } = useOrderContext()
  function handleTab(tabName) {
    setCurrentTab(tabName)
    handleFilter(tabName)
  }
  return (
    <section className="orders main">
      <h2 className="orders__title">Your Orders</h2>
      <div className="orders__container">
        <div className="orders__tabs">
          <button className={currentTab === 'orders' ? "orders__tab orders__tab--active" : "orders__tab"}
            onClick={() => handleTab('orders')}>Orders</button>
          <button className={currentTab === 'not-shipped' ? "orders__tab orders__tab--active" : "orders__tab"}
            onClick={() => handleTab('not-shipped')}>Yet To Be Shipped</button>
          <button className={currentTab === 'cancelled' ? "orders__tab orders__tab--active" : "orders__tab"}
            onClick={() => handleTab('cancelled')}>Cancelled</button>
        </div>
        <ul className="orders__list">
          {
            loading ? <h2>Loading...</h2> : filteredOrders.length === 0 ? (
              <p className="orders__empty">No Orders are available...</p>
            ) :
              filteredOrders.map((order) => (
                <li className="orders__item" key={order.id}>
                  <header className="orders__header">
                    <div className="orders__header-item">
                      <p className="orders__desc">Order Placed</p>
                      <p className="orders__desc">{dateFormatter(firebaseTimestapFormatter(order.orderedDate.seconds))}</p>
                    </div>
                    <div className="orders__header-item">
                      <p className="orders__desc">Total</p>
                      <p className="orders__desc">{currencyFormatter(order.totalAmount + order.deliveryFee)}</p>
                    </div>
                    <div className="orders__header-item">
                      <p className="orders__desc">Ship To</p>
                      <p className="orders__desc">{order.shippingAddress.fullName}</p>
                    </div>
                    <div className="orders__header-item">
                      <p className="orders__desc">Order # {order.id}</p>
                    </div>
                  </header>
                  <div className="orders__body">
                    <h3 className="orders__sub-title">{order.orderStatus}</h3>
                    <p className="orders__desc">Delevered on {order.deliveryDate}</p>
                    <div className="orders__products">
                      {
                        order.productsOrdered.map(product => (
                          <div className="orders__product" key={product.id}>
                            <img className='orders__product-img' src={product.images[0]} alt={product.name} />
                            <div className="orders__product-content">
                              <Link to={`/${createRouterPath(product.name)}`} className="orders__link"
                                state={{ productId: product.id }}>{product.name}</Link>
                              <p className="orders__desc">Quantity Ordered : {product.qty}</p>
                              <p className="orders__desc">Sub Total : {currencyFormatter(product.qty * product.price)}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </li>
              ))
          }

        </ul>
      </div>
    </section>
  )
}

export default AccountOrdersPage