import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectProducts } from "../features-app/products/productSlice";

export const useFilteredProducts = () => {
  const [searchParams, setProductsSearchParams] = useSearchParams();
  const products = useAppSelector(selectProducts);

  const sort = searchParams.get("sort") || "price_low_to_high";
  const rating = searchParams.get("rating") ? +searchParams.get("rating")! : 5;
  const brands = searchParams.get("brands")?.split("-") || [];
  const categoryIn = searchParams.get("category") || "";
  const availability = searchParams.get("availability") || "inStock";
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;

  const filterByCategory = categoryIn
    ? products.filter((product) => product.category === categoryIn)
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

  const handlePagination = (selectedPage: number) => {
    setProductsSearchParams(
      (prev) => {
        prev.set("page", selectedPage.toString());
        return prev;
      },
      { replace: true }
    );
  };

  const clearAllFilters = () => {
    setProductsSearchParams({}, { replace: true });
  };

  return {
    sort,
    rating,
    brands,
    categoryIn,
    availability,
    filteredProducts: sortByPrice,
    currentPage: page,
    search,
    setProductsSearchParams,
    handlePagination,
    clearAllFilters,
  };
};
