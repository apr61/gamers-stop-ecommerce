import {
  CART_REDUCER_ACTION_TYPES,
  CartStateType,
  ReducerAction,
} from "../context/CartContext";

const cartReducer = (
  state: CartStateType,
  { type, payload }: ReducerAction
) => {
  switch (type) {
    case CART_REDUCER_ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, { ...payload, qty: 1 }],
      };
    case CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== payload.id),
      };
    case CART_REDUCER_ACTION_TYPES.QUANTITY_INCREMENTOR:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === payload.id
            ? (c.qty = payload.quantity + 1)
            : c.qty
        ),
      };
    case CART_REDUCER_ACTION_TYPES.QUANTITY_DECREMENTOR:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === payload.id
            ? (c.qty = payload.quantity - 1)
            : c.qty
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
