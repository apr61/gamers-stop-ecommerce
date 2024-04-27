import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { Category, Product } from "../../utils/types";
import { RootState } from "../../app/store";
import { getCategoriesService, getProducts } from "../../services/products";

export type ProductSortType = "price_low_to_high" | "price_high_to_low";
export type ProductAvailabilityType = "inStock" | "outOfStock";

type ProductStateType = {
  products: Product[];
  categories: Category[];
  status: "idle" | "loading" | "failed" | "success";
  error: null | string;
  rating: number;
  brands: string[];
  availability: ProductAvailabilityType;
  sort: ProductSortType;
  categoryIn: Category | null;
  search: string;
  filterOpen: boolean;
};

const initialState: ProductStateType = {
  products: [],
  categories: [],
  status: "idle",
  error: null,
  rating: 5,
  brands: [],
  availability: "inStock",
  sort: "price_low_to_high",
  categoryIn: null,
  search: "",
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
    productRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    productSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    productAvailability: (
      state,
      action: PayloadAction<ProductAvailabilityType>
    ) => {
      state.availability = action.payload;
    },
    productSort: (state, action: PayloadAction<ProductSortType>) => {
      state.sort = action.payload;
    },
    productCategoryIn: (state, action: PayloadAction<Category>) => {
      state.categoryIn = action.payload;
    },
    productBrands: (state, action: PayloadAction<string>) => {
      state.brands = state.brands.includes(action.payload)
        ? state.brands.filter((brand) => brand !== action.payload)
        : [...state.brands, action.payload];
    },
    clearFilter: (state) => {
      state.brands = [];
      state.availability = "inStock";
      state.rating = 5;
      state.categoryIn = null;
    },
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
export const selectProductRating = (state: RootState) => state.product.rating;
export const selectProductAvailability = (state: RootState) =>
  state.product.availability;
export const selectProductSearch = (state: RootState) => state.product.search;
export const selectProductSort = (state: RootState) => state.product.sort;
export const selectProductsBrands = (state: RootState) => state.product.brands;
export const selectProductCategory = (state: RootState) =>
  state.product.categoryIn;
export const selectCategories = (state: RootState) => state.product.categories;
export const selectIsFilterOpen = (state: RootState) =>
  state.product.filterOpen;

export const getFilteredProducts = createSelector(
  (state: RootState) => state.product.products,
  (state: RootState) => state.product.categoryIn,
  (state: RootState) => state.product.brands,
  (state: RootState) => state.product.search,
  (state: RootState) => state.product.rating,
  (state: RootState) => state.product.availability,
  (state: RootState) => state.product.sort,
  (products, categoryIn, brands, search, rating, availability, sort) => {
    const filterByCategory = categoryIn
      ? products.filter((product) => product.category === categoryIn.category)
      : products;

    const filterByBrands =
      brands.length > 0
        ? filterByCategory.filter((product) =>
            brands.some((brand) => product.brand === brand)
          )
        : filterByCategory;

    const filterBySearch = search
      ? filterByBrands.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : filterByBrands;

    const filterByRating = filterBySearch.filter(
      (product) => product.avgrating <= rating
    );

    const filterByAvailability =
      availability === "inStock"
        ? filterByRating.filter((product) => product.quantity > 0)
        : filterByRating.filter((product) => product.quantity >= 0);

    const sortByPrice = sort
      ? filterByAvailability.sort((product1, product2) =>
          sort === "price_low_to_high"
            ? product1.price - product2.price
            : product2.price - product1.price
        )
      : filterByAvailability;
    return sortByPrice;
  }
);

export const {
  clearFilter,
  productAvailability,
  productBrands,
  productCategoryIn,
  productRating,
  productSearch,
  productSort,
  toggleFilter,
} = productSlice.actions;

export default productSlice.reducer;
