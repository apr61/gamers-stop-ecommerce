import {
  PRODUCT_REDUCER_TYPE,
  ProductReducerAction,
  ProductStateType,
  productStateInit,
} from "../context/ProductContext";

const productReducer = (
  state: ProductStateType,
  { type, payload }: ProductReducerAction
): ProductStateType => {
  switch (type) {
    case PRODUCT_REDUCER_TYPE.DISPLAY_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case PRODUCT_REDUCER_TYPE.DISPLAY_CATEGORIES:
      return {
        ...state,
        allCategories: payload,
      };
    case PRODUCT_REDUCER_TYPE.RATING:
      return {
        ...state,
        rating: payload,
      };
    case PRODUCT_REDUCER_TYPE.AVAILABILITY:
      return {
        ...state,
        availability: payload,
      };
    case PRODUCT_REDUCER_TYPE.BRANDS:
      return {
        ...state,
        brands: state.brands.includes(payload)
          ? state.brands.filter((brand) => brand !== payload)
          : [...state.brands, payload],
      };
    case PRODUCT_REDUCER_TYPE.SORT:
      return {
        ...state,
        sort: payload,
      };
    case PRODUCT_REDUCER_TYPE.CATEGORY:
      return {
        ...state,
        categoryIn: payload,
      };
    case PRODUCT_REDUCER_TYPE.SEARCH:
      return {
        ...state,
        search: payload,
      };
    case PRODUCT_REDUCER_TYPE.CLEAR_ALL_FILTERS:
      return {
        ...productStateInit,
        products: payload.products,
        allCategories: payload.allCategories,
      };
    default:
      return state;
  }
};

export default productReducer;
