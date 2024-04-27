import "./filter.css";
import Accoridon from "../../../components/accordion/Accordion";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  ProductAvailabilityType,
  ProductSortType,
  fetchProductsThunk,
  productAvailability,
  productBrands,
  productCategoryIn,
  productRating,
  productSort,
  selectCategories,
  selectProductAvailability,
  selectProductCategory,
  selectProductRating,
  selectProductSort,
  selectProducts,
  selectProductsBrands,
  toggleFilter,
} from "../productSlice";
import { useEffect } from "react";

function Filter() {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(selectCategories);
  const sort = useAppSelector(selectProductSort);
  const rating = useAppSelector(selectProductRating);
  const brands = useAppSelector(selectProductsBrands);
  const categoryIn = useAppSelector(selectProductCategory);
  const availability = useAppSelector(selectProductAvailability);
  const products = useAppSelector(selectProducts);

  const allUniqueBrands = [
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, []);

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
              checked={categoryIn?.id === category.id}
              onChange={() => dispatch(productCategoryIn(category))}
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
              onChange={(e) => dispatch(productBrands(e.target.value))}
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
            onChange={(e) => dispatch(productRating(+e.target.value))}
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
            onChange={(e) =>
              dispatch(
                productAvailability(e.target.value as ProductAvailabilityType)
              )
            }
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
            onChange={(e) =>
              dispatch(productSort(e.target.value as ProductSortType))
            }
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
            onChange={(e) =>
              dispatch(productSort(e.target.value as ProductSortType))
            }
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
