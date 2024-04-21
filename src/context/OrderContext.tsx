import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { orderReducer } from "../reducers/orderReducer";
import { getAllOrdersByUserIdService } from "../services/orders";
import { useAuthContext } from "./AuthContext";
import { Order } from "../utils/types";

export type OrderStateType = {
  orders: Order[];
  isLoading: boolean; 
  currentOption: "all-orders" | "delivered" | "yet-to-be-shipped" | "cancelled";
};

export type OrderContextType = {
  ordersState: OrderStateType;
  orderDispatch: React.Dispatch<ReducerActionType>;
  handleOrderOptions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filteredOrders: Order[]
};

const OrderContextInit: OrderContextType = {
  ordersState: {
    orders: [],
    isLoading: false,
    currentOption: "all-orders",
  },
  orderDispatch: () => {},
  handleOrderOptions: () => {},
  filteredOrders: []
};

const OrderStateInit: OrderStateType = {
  orders: [],
  isLoading: false,
  currentOption: "all-orders",
};

const OrderContext = createContext<OrderContextType>(OrderContextInit);

export const ORDER_REDUCER_ACTION_TYPE = {
  IS_LOADING: "IS_LOADING",
  DISPLAY_ORDERS: "DISPLAY_ORDERS",
  CURRENT_OPTION: "CURRENT_OPTION",
};

export type ReducerActionType = {
  type: string;
  payload: any;
};

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function OrdersProvider({ children }: ChildrenType) {
  document.title = "Orders | Gamers Stop";

  const [ordersState, orderDispatch] = useReducer(orderReducer, OrderStateInit);

  const { currentUser } = useAuthContext();

  const getAllOrdersByUserId = async (userId: string) => {
    try {
      orderDispatch({
        type: ORDER_REDUCER_ACTION_TYPE.IS_LOADING,
        payload: { ...ordersState, isLoading: true },
      });
      const data = await getAllOrdersByUserIdService(userId);
      orderDispatch({
        type: ORDER_REDUCER_ACTION_TYPE.DISPLAY_ORDERS,
        payload: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      orderDispatch({
        type: ORDER_REDUCER_ACTION_TYPE.IS_LOADING,
        payload: false,
      });
    }
  };
  useEffect(() => {
    currentUser?.uid && getAllOrdersByUserId(currentUser.uid);
  }, [currentUser?.uid]);

  function handleOrderOptions(e: React.ChangeEvent<HTMLSelectElement>) {
    orderDispatch({
      type: ORDER_REDUCER_ACTION_TYPE.CURRENT_OPTION,
      payload: e.target.value,
    });
  }

  const filterByCurrentOption =
    ordersState.currentOption === "all-orders"
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
