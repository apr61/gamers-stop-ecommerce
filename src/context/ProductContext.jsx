import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import productReducer, { productInitalState } from "../reducers/productReducer";
import { getCategoriesService, getProducts } from "../services/products";

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productsState, productDispatch] = useReducer(
    productReducer,
    productInitalState
  );

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      productDispatch({
        type: "DISPLAY_PRODUCTS",
        payload: data,
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getAllCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategoriesService();
      productDispatch({
        type: "DISPLAY_CATEGORIES",
        payload: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);
  const toggleFilter = () => setIsFilterOpen((filter) => !filter);

  const filterByCategory = productsState.categoryIn
    ? productsState.products.filter(
        (product) => product.category === productsState.categoryIn
      )
    : productsState.products;

  const filterByBrands =
    productsState.brands.length > 0
      ? filterByCategory.filter((product) =>
          productsState.brands.some((brand) => product.brand === brand)
        )
      : filterByCategory;

  const filterByRating = filterByBrands.filter(
    (product) => product.avgrating <= productsState.rating
  );
  const filterByAvailability =
    productsState.availability === "inStock"
      ? filterByRating.filter((product) => product.quantity > 0)
      : filterByRating.filter((product) => product.quantity >= 0);
  const sortByPrice = productsState.sort
    ? filterByAvailability.sort((product1, product2) =>
        productsState.sort === "price_low_to_high"
          ? product1.price - product2.price
          : product2.price - product1.price
      )
    : filterByAvailability;
  return (
    <ProductContext.Provider
      value={{
        productsState,
        productDispatch,
        isLoading,
        isFilterOpen,
        toggleFilter,
        filteredProducts: sortByPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
