import { OrderStateType, ReducerActionType } from "../context/OrderContext";

export const orderReducer = (
  state: OrderStateType,
  { type, payload }: ReducerActionType
) : OrderStateType => {
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
