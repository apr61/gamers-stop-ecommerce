import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Address, AddressData } from "../../utils/types";
import { RootState } from "../../store/store";
import {
  addAddressService,
  deleteAddressById,
  getAddressesService,
  updateAddressByIdService,
} from "../../services/address";

type AddressStateType = {
  address: Address[];
  status: "idle" | "loading" | "failed" | "success";
  error: string;
};

const initialState: AddressStateType = {
  address: [],
  status: "idle",
  error: "",
};

export const fetchAddressByUser = createAsyncThunk(
  "address/fetchAddessByUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getAddressesService(id);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addNewAddressThunk = createAsyncThunk(
  "address/addNewAdddressThunk",
  async (address: AddressData, { rejectWithValue }) => {
    try {
      const response = await addAddressService(address);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const updateAddressThunk = createAsyncThunk(
  "address/updateAddressThunk",
  async (address: Address, { rejectWithValue }) => {
    try {
      const response = await updateAddressByIdService(address);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const removeAddressThunk = createAsyncThunk(
  "address/removeAddressThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteAddressById(id);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAddressByUser.fulfilled, (state, action) => {
        state.status = "success";
        state.address = action.payload as Address[];
        state.error = "";
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.status = "success";
        const existingItemIndex = state.address.findIndex(
          (add) => add.id === action.payload?.id
        );
        if (existingItemIndex !== -1) {
          state.address[existingItemIndex] = action.payload!;
        }
        state.error = "";
      })
      .addCase(addNewAddressThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.address.push(action.payload as Address);
        state.error = "";
      })
      .addCase(removeAddressThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.address = state.address.filter(
          (add) => add.id !== action.payload
        );
        state.error = "";
      })
      .addMatcher(
        isAnyOf(
          fetchAddressByUser.pending,
          addNewAddressThunk.pending,
          updateAddressThunk.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAddressByUser.rejected,
          addNewAddressThunk.rejected,
          updateAddressThunk.rejected,
          removeAddressThunk.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const {} = addressSlice.actions;

export const selectAddresses = (state: RootState) => state.address.address;
export const selectAddressStatus = (state: RootState) => state.address.status;
export const selectAddressError = (state: RootState) => state.address.error;

export default addressSlice.reducer;
