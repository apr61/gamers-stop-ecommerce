import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initalOrderState, orderReducer } from "../reducers/orderReducer";
import { getAllOrdersByUserIdService } from "../services/orders";
import { useAuthContext } from "./AuthContext";

const OrderContext = createContext();

function OrdersProvider({ children }) {
  document.title = "Orders | Gamers Stop";
  const [ordersState, orderDispatch] = useReducer(
    orderReducer,
    initalOrderState
  );
  const { currentUser } = useAuthContext();
  const getAllOrdersByUserId = async (userId) => {
    try {
      orderDispatch({ type: "IS_LOADING", payload: true });
      const data = await getAllOrdersByUserIdService(userId);
      orderDispatch({ type: "DISPLAY_ORDERS", payload: data });
    } catch (err) {
      console.error(err);
    } finally {
      orderDispatch({ type: "IS_LOADING", payload: false });
    }
  };
  useEffect(() => {
    currentUser?.uid && getAllOrdersByUserId(currentUser.uid);
  }, [currentUser?.uid]);
  function handleOrderOptions(e) {
    orderDispatch({ type: "CURRENT_OPTION", payload: e.target.value });
  }
  const filterByCurrentOption =
    ordersState.currentOption === "all orders"
      ? ordersState.orders
      : ordersState.orders.filter(
          (order) => order.orderStatus === ordersState.currentOption
        );
  return (
    <OrderContext.Provider
      value={{
        ordersState,
        orderDispatch,
        handleOrderOptions,
        filteredOrders: filterByCurrentOption,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrdersProvider;

export function useOrderContext() {
  return useContext(OrderContext);
}
