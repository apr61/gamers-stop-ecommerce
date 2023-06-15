export const productInitalState = {
  products: [],
  allCategories: [],
  rating: 5,
  brands: [],
  availability: "inStock",
  sort: "price_low_to_high",
  categoryIn: "",
};

const productReducer = (state, { type, payload }) => {
  switch (type) {
    case "DISPLAY_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "DISPLAY_CATEGORIES":
      return {
        ...state,
        allCategories: payload,
      };
    case "RATING":
      return {
        ...state,
        rating: payload,
      };
    case "AVAILABILITY":
      return {
        ...state,
        availability: payload,
      };
    case "BRANDS":
      return {
        ...state,
        brands: state.brands.includes(payload)
          ? state.brands.filter((brand) => brand !== payload)
          : [...state.brands, payload],
      };
    case "SORT":
      return {
        ...state,
        sort: payload,
      };
    case "CATEGORY":
      return {
        ...state,
        categoryIn: payload,
      };
    case "CLEAR_ALL_FILTERS":
      return {
        ...productInitalState,
        products: payload.products,
        allCategories: payload.allCategories,
      };
    default:
      return state;
  }
};

export default productReducer;
