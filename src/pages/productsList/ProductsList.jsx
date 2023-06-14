import "./productsList.css";
import ProductCard from "../../components/productCard/ProductCard";
import Filter from "../../components/filter/Filter";

import { useFilterSortContext } from "../../context/FilterSortContext";
import { FaSort } from "react-icons/fa";
import { useState } from "react";

function ProductsList() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  document.title = "Store | Gamers Stop";
  const {
    filterState: { filtered_products: products },
    isLoading,
  } = useFilterSortContext();

  return (
    <>
      <div className="category-products__body">
        <section
          className={
            isFiltersOpen
              ? "category-products__filter isFilterOpen"
              : "category-products__filter"
          }
        >
          <h3 className="category-products__title">Filters</h3>
          <Filter />
        </section>
        <section className="category-products__container">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <header className="category-products__header">
              <p className="categorty-products__items-found">
                {products.length} items found
              </p>
              <button className="category-products__filter-btn">
                <FaSort />
              </button>
            </header>
          )}
          {products.length > 0 ? (
            <div className="category-products__list">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  customStyles={"category-products__products-card--width"}
                />
              ))}
            </div>
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
