export const initalOrderState = {
  orders: [],
  isLoading: false,
  currentOption: "all orders",
};

export const orderReducer = (state, { type, payload }) => {
  switch (type) {
    case "IS_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "DISPLAY_ORDERS":
      return {
        ...state,
        orders: payload,
      };
    case "CURRENT_OPTION":
      return {
        ...state,
        currentOption: payload,
      };
    default:
      return state;
  }
};
