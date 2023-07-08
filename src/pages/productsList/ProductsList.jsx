import "./productsList.css";
import ProductCard from "../../components/productCard/ProductCard";
import Filter from "../../components/filter/Filter";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useProducts } from "../../context/ProductContext";
import Loader from "../../components/loader/Loader";

function ProductsList() {
  document.title = "Store | Gamers Stop";
  const {
    productsState: { products, allCategories },
    isLoading,
    isFilterOpen,
    filteredProducts,
    productDispatch,
    toggleFilter,
  } = useProducts();
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
              onClick={() =>
                productDispatch({
                  type: "CLEAR_ALL_FILTERS",
                  payload: { products, allCategories },
                })
              }
            >
              Clear
            </button>
          </div>
          <Filter />
        </section>
        <section className="category-products__container">
          {isLoading ? (
            <Loader />
          ) : filteredProducts.length > 0 ? (
            <>
              <header className="category-products__header">
                <p className="categorty-products__items-found">
                  Showing {filteredProducts.length} of {products.length}
                </p>
                <button
                  className="category-products__filter-btn"
                  onClick={() => toggleFilter()}
                >
                  <FilterListIcon />
                </button>
              </header>
              <div className="category-products__list">
                {filteredProducts?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    customStyles={"category-products__products-card--width"}
                  />
                ))}
              </div>
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
