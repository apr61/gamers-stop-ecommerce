import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import productReducer from "../reducers/productReducer";
import { getCategoriesService, getProducts } from "../services/products";
import { Category, Product } from "../utils/types";

export type ProductStateType = {
  products: Product[];
  allCategories: Category[];
  rating: number;
  brands: string[];
  availability: "inStock" | "outOfStock";
  sort: "price_low_to_high" | "price_high_to_low";
  categoryIn: string;
  search: string;
};

export type ProductContextType = {
  productsState: ProductStateType;
  productDispatch: React.Dispatch<ProductReducerAction>;
  isLoading: boolean;
  isFilterOpen: boolean;
  toggleFilter: () => void;
  filteredProducts: Product[];
};

export type ProductReducerAction = {
  type: string;
  payload: any;
};

export const productStateInit: ProductStateType = {
  products: [],
  allCategories: [],
  rating: 5,
  brands: [],
  availability: "inStock",
  sort: "price_low_to_high",
  categoryIn: "",
  search: "",
};

export const PRODUCT_REDUCER_TYPE = {
  DISPLAY_PRODUCTS: "DISPLAY_PRODUCTS",
  DISPLAY_CATEGORIES: "DISPLAY_CATEGORIES",
  AVAILABILITY: "AVAILABILITY",
  BRANDS: "BRANDS",
  SORT: "SORT",
  CATEGORY: "CATEGORY",
  SEARCH: "SEARCH",
  CLEAR_ALL_FILTERS: "CLEAR_ALL_FILTERS",
  RATING: "RATING",
};

const ProductContextInit: ProductContextType = {
  productsState: productStateInit,
  productDispatch: () => {},
  isLoading: false,
  isFilterOpen: false,
  toggleFilter: () => {},
  filteredProducts: [],
};

const ProductContext = createContext<ProductContextType>(ProductContextInit);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function ProductProvider({ children }: ChildrenType) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productsState, productDispatch] = useReducer(
    productReducer,
    productStateInit
  );

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      productDispatch({
        type: PRODUCT_REDUCER_TYPE.DISPLAY_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.error(err);
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

  const filterBySearch = productsState.search
    ? filterByBrands.filter((product) =>
        product.name.toLowerCase().includes(productsState.search.toLowerCase())
      )
    : filterByBrands;
    
  const filterByRating = filterBySearch.filter(
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

export function useProducts() {
  return useContext(ProductContext);
}
