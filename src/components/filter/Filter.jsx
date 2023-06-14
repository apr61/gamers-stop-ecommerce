import "./filter.css";
import Accoridon from "../accordion/Accordion";
import { useFilterSortContext } from "../../context/FilterSortContext";
import { AiOutlineClose, AiFillStar } from "react-icons/ai";

function Filter({ handleOpenFilterSection }) {
  const {
    filterState: { all_products },
  } = useFilterSortContext();

  const allUniqueBrands = [
    ...new Set(all_products.map((product) => product.brand)),
  ];

  const allUniqueCategories = [
    ...new Set(all_products.map((product) => product.category)),
  ];

  return (
    <section className="filter-section">
      <button
        className="filter-section__close-btn"
        onClick={handleOpenFilterSection}
      >
        <AiOutlineClose />
      </button>
      <Accoridon title="Categories">
        {allUniqueCategories.map((category, i) => (
          <div className="filter__input" key={category + i}>
            <input type="radio" id={category} name="categories" />
            <label htmlFor={category} className="filter__input-label">
              {category}
            </label>
          </div>
        ))}
      </Accoridon>
      <Accoridon title={"Brands"}>
        {allUniqueBrands.map((brand, i) => (
          <div className="filter__input" key={brand + i}>
            <input type="checkbox" id={brand} name={brand} />
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
              <AiFillStar color="gold" />
              <span>1</span>
            </div>
            <div className="filter__star">
              <AiFillStar color="gold" />
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
          <input type="checkbox" id="out_of_stock" />
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
