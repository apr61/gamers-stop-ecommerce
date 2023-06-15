const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...payload, qty: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== payload.id),
      };
    case "QUANTITY_INCREMENTOR":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === payload.id ? (c.qty = payload.quantity + 1) : c.qty
        ),
      };
    case "QUANTITY_DECREMENTOR":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === payload.id ? (c.qty = payload.quantity - 1) : c.qty
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
