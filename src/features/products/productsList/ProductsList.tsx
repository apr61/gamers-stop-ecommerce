import "./productsList.css";
import ProductCard from "../productCard/ProductCard";
import Filter from "../filter/Filter";
import FilterListIcon from "@mui/icons-material/FilterList";
import Loader from "../../../components/loader/Loader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearFilter,
  getFilteredProducts,
  productPage,
  selectIsFilterOpen,
  selectProductPage,
  selectProductStatus,
  selectProducts,
  toggleFilter,
} from "../productSlice";
import Pagination from "../../../components/pagination/Pagination";

function ProductsList() {
  document.title = "Store | Gamers Stop";
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductStatus);
  const isFilterOpen = useAppSelector(selectIsFilterOpen);
  const totalProductsCount = products.length;
  const filteredProducts = useAppSelector(getFilteredProducts);
  const currentPage = useAppSelector(selectProductPage);
  const itemsPerPage = 3;

  const handlePaginationCallback = (selectPage: number) => {
    dispatch(productPage(selectPage));
  };
  return (
    <>
      <div className="category-products__body">
        <section
          className={
            isFilterOpen
              ? "category-products__filter isFilterOpen"
              : "category-products__filter"
          }
        >
          <div className="category-products__row">
            <h3 className="category-products__title">Filters</h3>
            <button
              className="category-products__clear-btn"
              onClick={() => dispatch(clearFilter())}
            >
              Clear
            </button>
          </div>
          <Filter />
        </section>
        <section className="category-products__container">
          {isLoading === "loading" ? (
            <Loader />
          ) : filteredProducts.length > 0 ? (
            <>
              <header className="category-products__header">
                <p className="categorty-products__items-found">
                  Showing {filteredProducts.length} of {totalProductsCount}
                </p>
                <button
                  className="category-products__filter-btn"
                  onClick={() => dispatch(toggleFilter())}
                >
                  <FilterListIcon />
                </button>
              </header>
              <div className="category-products__list">
                {filteredProducts
                  .slice(
                    currentPage * itemsPerPage - itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
              <Pagination
                totalCount={totalProductsCount}
                itemsPerPage={itemsPerPage}
                callback={handlePaginationCallback}
              />
            </>
          ) : (
            <div className="category-products__empty">
              <p className="category-products__para">
                No Products Available...
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default ProductsList;
