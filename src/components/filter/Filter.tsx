import "./filter.css";
import Accoridon from "../accordion/Accordion";
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from "../../context/ProductContext";

function Filter() {
  const {
    productsState: {
      allCategories,
      sort,
      rating,
      brands,
      categoryIn,
      availability,
      products,
    },
    productDispatch,
    toggleFilter,
  } = useProducts();
  
  const allUniqueBrands = [
    ...new Set(products.map((product) => product.brand)),
  ];

  return (
    <section className="filter-section">
      <button
        className="filter-section__close-btn"
        onClick={() => toggleFilter()}
      >
        <CloseIcon />
      </button>
      <Accoridon title="Categories">
        {allCategories.map(({ id, category }) => (
          <div className="filter__input" key={id}>
            <input
              type="radio"
              id={id}
              name="categories"
              value={category}
              checked={categoryIn === category}
              onChange={(e) =>
                productDispatch({
                  type: "CATEGORY",
                  payload: e.target.value.toLowerCase(),
                })
              }
            />
            <label htmlFor={id} className="filter__input-label">
              {category}
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
              onChange={(e) =>
                productDispatch({ type: "BRANDS", payload: e.target.value })
              }
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
            onChange={(e) =>
              productDispatch({ type: "RATING", payload: e.target.value })
            }
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
              productDispatch({ type: "AVAILABILITY", payload: e.target.value })
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
              productDispatch({ type: "SORT", payload: e.target.value })
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
              productDispatch({ type: "SORT", payload: e.target.value })
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
