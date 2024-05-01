import "./filter.css";
import Accoridon from "../../../components/accordion/Accordion";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProductsThunk,
  selectCategories,
  selectProducts,
  toggleFilter,
} from "../productSlice";
import { ChangeEvent, useEffect } from "react";
import { useFilteredProducts } from "../../../hooks/useFilteredProducts";

function Filter() {
  const dispatch = useAppDispatch();
  const {
    sort,
    rating,
    brands,
    categoryIn,
    availability,
    setProductsSearchParams,
  } = useFilteredProducts();

  const allCategories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);

  const allUniqueBrands = [
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, []);

  const handleBrandsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductsSearchParams((prev) => {
      const prevBrandsSearch = prev.get("brands") || "";
      let prevBrands = prevBrandsSearch.split("-").filter((p) => p !== "");
      if (prevBrands.indexOf(value) !== -1) {
        prevBrands = prevBrands.filter((brand) => brand !== value);
      } else {
        prevBrands.push(value);
      }
      const res = prevBrands.join("-").toString();
      if (res.length > 0) {
        prev.set("brands", res);
      } else {
        prev.delete("brands");
      }
      return prev;
    }, {replace: true});
  };

  return (
    <section className="filter-section">
      <button
        className="filter-section__close-btn"
        onClick={() => dispatch(toggleFilter())}
      >
        <CloseIcon />
      </button>
      <Accoridon title="Categories">
        {allCategories.map((category) => (
          <div className="filter__input" key={category.id}>
            <input
              type="radio"
              id={category.id}
              name="categories"
              value={category.category}
              checked={categoryIn === category.category}
              onChange={(e) => {
                setProductsSearchParams((prev) => {
                  prev.set("category", e.target.value);
                  return prev;
                }, {replace: true});
              }}
            />
            <label htmlFor={category.id} className="filter__input-label">
              {category.category}
            </label>
          </div>
        ))}
      </Accoridon>
      <Accoridon title={"Brands"}>
        {allUniqueBrands.map((brand, i) => (
          <div className="filter__input" key={brand + i}>
            <input
              type="checkbox"
              id={brand}
              name={brand}
              value={brand}
              checked={brands.includes(brand)}
              onChange={(e) => handleBrandsChange(e)}
            />
            <label htmlFor={brand} className="filter__input-label">
              {brand}
            </label>
          </div>
        ))}
      </Accoridon>
      <Accoridon title={"Customer Review"}>
        <div className="filter__cus-review">
          <div className="filter__star-con">
            <div className="filter__star">
              <StarIcon htmlColor="gold" />
              <span>1</span>
            </div>
            <div className="filter__star">
              <StarIcon htmlColor="gold" />
              <span>5</span>
            </div>
          </div>
          <input
            className="filter__cus-review-in"
            type="range"
            min="1"
            max="5"
            step="1"
            list="values"
            value={rating}
            onChange={(e) => {
              setProductsSearchParams((prev) => {
                prev.set("rating", e.target.value);
                return prev;
              }, {replace: true});
            }}
          />
          <datalist className="filter__datalist" id="values">
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
            <option value="4" label="4"></option>
            <option value="5" label="5"></option>
          </datalist>
        </div>
      </Accoridon>
      <Accoridon title={"Availability"}>
        <div className="filter__input">
          <input
            type="checkbox"
            id="out_of_stock"
            value={availability === "inStock" ? "outOfStock" : "inStock"}
            checked={availability === "outOfStock"}
            onChange={(e) => {
              setProductsSearchParams((prev) => {
                prev.set("availability", e.target.value);
                return prev;
              }, {replace: true});
            }}
          />
          <label htmlFor="out_of_stock" className="filter__input-label">
            Include out of stock
          </label>
        </div>
      </Accoridon>
      <Accoridon title={"Sort"}>
        <div className="filter__input">
          <input
            type="radio"
            name="sort"
            id="price_low_to_high"
            value="price_low_to_high"
            checked={sort === "price_low_to_high"}
            onChange={(e) => {
              setProductsSearchParams((prev) => {
                prev.set("sort", e.target.value);
                return prev;
              }, {replace: true});
            }}
          />
          <label htmlFor="price_low_to_high" className="filter__input-label">
            Price Low To High
          </label>
        </div>
        <div className="filter__input">
          <input
            type="radio"
            name="sort"
            id="price_high_to_low"
            value="price_high_to_low"
            checked={sort === "price_high_to_low"}
            onChange={(e) => {
              setProductsSearchParams((prev) => {
                prev.set("sort", e.target.value);
                return prev;
              }, {replace: true});
            }}
          />
          <label htmlFor="price_high_to_low" className="filter__input-label">
            Price High To Low
          </label>
        </div>
      </Accoridon>
    </section>
  );
}

export default Filter;
