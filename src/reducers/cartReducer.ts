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
        cart: [...state.cart, { ...payload }],
      };
    case CART_REDUCER_ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== payload?.id),
      };
    case CART_REDUCER_ACTION_TYPES.QUANTITY_INCREMENTOR: {
      const existingItems = state.cart.filter(
        (cart) => cart.id === payload.id
      )[0];
      const filteredItems = state.cart.filter((cart) => cart.id !== payload.id);
      const qty =
        existingItems.qty < existingItems.quantity
          ? existingItems.qty + 1
          : existingItems.quantity;
      return {
        ...state,
        cart: [...filteredItems, { ...existingItems, qty: qty }],
      };
    }
    case CART_REDUCER_ACTION_TYPES.QUANTITY_DECREMENTOR: {
      const existingItems = state.cart.filter(
        (cart) => cart.id === payload.id
      )[0];
      const filteredItems = state.cart.filter((cart) => cart.id !== payload.id);
      const qty = existingItems.qty >= 1 ? existingItems.qty - 1 : 0;
      // Handle when qty is zero or remove item
      if (qty === 0) {
        return {
          ...state,
          cart: [...filteredItems],
        };
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
