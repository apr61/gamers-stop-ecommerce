import React, { createContext, useContext, useEffect } from 'react'
import { useAsync } from '../hooks/useAsync'
import { getAllOrders } from '../services/orders'
import { useAuthContext } from './AuthContext'

const OrderContext = createContext()

function OrdersProvider({ children }) {
    const {loading, error, value: orders} = useAsync(getAllOrders)
    const [localOrders, setLocalOrders] = useState()
    const {currentUser} = useAuthContext()
    useEffect(() => {
        !loading && setLocalOrders(orders.filter(order => order.uid === currentUser.uid))
    }, [orders])
    
    return (
        <OrderContext.Provider value={{loading, error, localOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrdersProvider

export function useOrderContext() {
    return useContext(OrderContext)
}