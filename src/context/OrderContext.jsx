import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getAllOrders } from '../services/orders'
import { useAuthContext } from './AuthContext'

const OrderContext = createContext()

const Tab = {
	'cancelled' : 'cancelled',
	'not-shipped' : 'yet tobe shipped'
}

function OrdersProvider({ children }) {
    const {loading, error, value: orders} = useAsync(getAllOrders)
    const [localOrders, setLocalOrders] = useState([])
	const [filteredOrders, setFilteredOrders] = useState([])
    const {currentUser} = useAuthContext()
    useEffect(() => {
        if(loading) return 
        setLocalOrders(orders.filter(order => order.uid === currentUser.uid))
        setFilteredOrders(orders.filter(order => order.orderStatus === 'confirmed' || 'yet tobe shipped'))
    }, [orders])
    function handleFilter(tabName){
        tabName === 'orders' ? 
        setFilteredOrders(localOrders.filter(order => order.orderStatus === 'confirmed' || 'yet tobe shipped'))
        : setFilteredOrders(localOrders.filter(order => order.orderStatus === Tab[tabName]))
    }
    return (
        <OrderContext.Provider value={{loading, error, filteredOrders, handleFilter}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrdersProvider

export function useOrderContext() {
    return useContext(OrderContext)
}