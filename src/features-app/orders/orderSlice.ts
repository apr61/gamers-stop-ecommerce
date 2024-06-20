import {
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { Order } from "../../utils/types";
import { RootState } from "../../store/store";
import {
  createAnOrderService,
  deleteOrderByIdService,
  getAllOrdersByUserIdService,
  getOrderByIdService,
  updateOrderByIdService,
} from "../../services/orders";

type orderOptions =
  | "all-orders"
  | "delivered"
  | "yet-to-be-shipped"
  | "cancelled";

type OrderStateType = {
  orders: Order[];
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
  currentOption: orderOptions;
  order: Order | null;
};

const initialState: OrderStateType = {
  orders: [],
  status: "idle",
  error: null,
  currentOption: "all-orders",
  order: null,
};

export const fetchOrdersByUserThunk = createAsyncThunk(
  "order/fetchOrdersByUserThunk",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = getAllOrdersByUserIdService(userId);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const fetchSingleOrderThunk = createAsyncThunk(
  "order/fetchSingleOrderThunk",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = getOrderByIdService(orderId);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addNewOrderThunk = createAsyncThunk(
  "order/addNewOrderThunk",
  async (order: Order, { rejectWithValue }) => {
    try {
      const response = createAnOrderService(order);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const updateOrderByIdThunk = createAsyncThunk(
  "order/updateOrderThunk",
  async (order: Order, { rejectWithValue }) => {
    try {
      const response = updateOrderByIdService(order);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const deleteOrderThunk = createAsyncThunk(
  "order/deleteOrderThunk",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = deleteOrderByIdService(orderId);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    setCurrentOption: (state, action) => {
      state.currentOption = action.payload;
    },
    setOrdersStatus: (state, action) => {
      state.status = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersByUserThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload as Order[];
      })
      .addCase(fetchSingleOrderThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload as Order | null;
      })
      .addMatcher(
        isAnyOf(
          fetchOrdersByUserThunk.pending,
          updateOrderByIdThunk.pending,
          deleteOrderThunk.pending,
          fetchSingleOrderThunk.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchOrdersByUserThunk.rejected,
          updateOrderByIdThunk.rejected,
          deleteOrderThunk.rejected,
          fetchSingleOrderThunk.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;
export const selectSingleOrder = (state: RootState) => state.order.order;
export const selectOrderCurrentOption = (state: RootState) =>
  state.order.currentOption;
export const selectFilteredOrders = createSelector(
  (state: RootState) => state.order.orders,
  (state: RootState) => state.order.currentOption,
  (orders, currentOption) =>
    currentOption === "all-orders"
      ? orders
      : orders.filter((o) => o.orderStatus === currentOption)
);

export const { setCurrentOption, setOrdersStatus } = orderSlice.actions;

export default orderSlice.reducer;
