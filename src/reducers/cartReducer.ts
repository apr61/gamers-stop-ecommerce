import {
  CART_REDUCER_ACTION_TYPES,
  CartStateType,
  ReducerAction,
} from "../context/CartContext";

const cartReducer = (
  state: CartStateType,
  action: ReducerAction
) => {
  switch (action.type) {
    case CART_REDUCER_ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload?.id),
      };
    case CART_REDUCER_ACTION_TYPES.QUANTITY_INCREMENTOR: {
      const existingItems = state.cart.find((cart) => cart.id === action.payload.id);
      const filteredItems = state.cart.filter((cart) => cart.id !== action.payload.id);
      let qty;
      if (existingItems) {
        qty =
          existingItems.qty < existingItems.quantity
            ? existingItems.qty + 1
            : existingItems.quantity;
      }
      return {
        ...state,
        cart: [...filteredItems, { ...existingItems, qty: qty }],
      };
    }
    case CART_REDUCER_ACTION_TYPES.QUANTITY_DECREMENTOR: {
      const existingItems = state.cart.find((cart) => cart.id === action.payload.id);
      const filteredItems = state.cart.filter((cart) => cart.id !== action.payload.id);
      let qty;
      if (existingItems) {
        qty =
          existingItems.qty > 1
            ? existingItems.qty - 1
            : 1;
      }
      return {
        ...state,
        cart: [...filteredItems, { ...existingItems, qty: qty }],
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
