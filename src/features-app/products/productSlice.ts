import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { Category, Product } from "../../utils/types";
import { RootState } from "../../store/store";
import { getCategoriesService, getProducts } from "../../services/products";

type ProductStateType = {
  products: Product[];
  categories: Category[];
  status: "idle" | "loading" | "failed" | "success";
  error: null | string;
  filterOpen: boolean;
};

const initialState: ProductStateType = {
  products: [],
  categories: [],
  status: "idle",
  error: null,
  filterOpen: false,
};

// export const fetchProductsThunk = createAsyncThunk(
//   "product/fetchProductsThunk",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { categoryIn, search, brands, rating, availability } = (
//         getState() as RootState
//       ).product;
//       const filterArgs: FilterArgsType = {
//         categoryIn: categoryIn?.category,
//         search: search.toLowerCase(),
//         brands: brands,
//         rating: rating,
//         availability: availability,
//       };
//       const response = await getFilteredProducts(filterArgs);
//       return response;
//     } catch (error) {
//       if (error instanceof Error) return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchProductsThunk = createAsyncThunk(
  "product/fetchProductsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "product/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoriesService();
      return response;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    toggleFilter: (state) => {
      state.filterOpen = !state.filterOpen;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload as Product[];
        // state.totalProducts = action.payload?.totalCount as number;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload as Category[];
        state.error = null;
      })
      .addMatcher(
        isAnyOf(fetchProductsThunk.rejected, fetchCategory.pending),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload as string;
          state.products = [];
        }
      )
      .addMatcher(
        isAnyOf(fetchProductsThunk.pending, fetchCategory.pending),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductStatus = (state: RootState) => state.product.status;
export const selectProductError = (state: RootState) => state.product.error;
export const selectCategories = (state: RootState) => state.product.categories;
export const selectIsFilterOpen = (state: RootState) =>
  state.product.filterOpen;

export const { toggleFilter } = productSlice.actions;

export default productSlice.reducer;
