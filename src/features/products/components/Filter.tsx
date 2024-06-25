import Button from "@/components/ui/Button";
import Accoridon from "@/components/ui/accordion/Accordion";
import { fetchBrands, selectBrands } from "@/features/brands/brandsSlice";
import {
  fetchCategories,
  selectCategories,
} from "@/features/categories/categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CloseOutlined, StarFilled } from "@ant-design/icons";
import { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type FilterProps = {
  isOpen: boolean;
  close: () => void;
};

const Filter = ({ isOpen, close }: FilterProps) => {
  const [_, setSearchParams] = useSearchParams();

  const handleClear = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div
      className={
        isOpen ? "fixed top-0 bottom-0 left-0 right-0 bg-pop-over z-50" : ""
      }
    >
      <div
        className={
          isOpen
            ? "fixed top-0 bottom-0 left-0 bg-dimBlack w-[80vw] overflow-y-auto p-2"
            : "border border-border rounded-md shadow-md p-2 h-fit sticky top-0 hidden lg:block"
        }
      >
        <header className="flex items-center p-2">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button btnType="ghost" onClick={handleClear} className="ml-auto mr-2 md:mr-4 lg:mr-0">
            Clear
          </Button>
          <Button
            btnType="icon"
            className={isOpen ? "text-xl block" : "hidden"}
            onClick={close}
          >
            <CloseOutlined />
          </Button>
        </header>
        <CategoryFilter />
        <BrandsFilter />
        <RatingFilter />
        <AvailabilityFilter />
      </div>
    </div>
  );
};

export default Filter;

const RatingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rating = searchParams.get("rating") ? +searchParams.get("rating")! : 5;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("rating", e.target.value);
        return prev;
      },
      { replace: true },
    );
  };
  return (
    <Accoridon title="Customer Review">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center text-lg">
            <StarFilled className="text-yellow-500" />
            <span>1</span>
          </div>
          <div className="flex gap-1 items-center text-lg">
            <StarFilled className="text-yellow-500" />
            <span>5</span>
          </div>
        </div>
        <input
          className="w-full cursor-pointer"
          name="rating"
          type="range"
          min="1"
          max="5"
          step="1"
          list="values"
          onChange={handleChange}
          value={rating}
        />
        <datalist className="flex justify-between px-2" id="values">
          <option value="1" label="1"></option>
          <option value="2" label="2"></option>
          <option value="3" label="3"></option>
          <option value="4" label="4"></option>
          <option value="5" label="5"></option>
        </datalist>
      </div>
    </Accoridon>
  );
};

const AvailabilityFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const availability = searchParams.get("availability") || "inStock";
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (prev) => {
        prev.set("availability", e.target.value);
        return prev;
      },
      { replace: true },
    );
  };
  return (
    <Accoridon title="Availability">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="out_of_stock"
          name="stock"
          onChange={handleChange}
          value={availability === "inStock" ? "outOfStock" : "inStock"}
          checked={availability === "outOfStock"}
        />
        <label htmlFor="out_of_stock" className="capitalize">
          Include out of stock
        </label>
      </div>
    </Accoridon>
  );
};

const CategoryFilter = () => {
  const {
    data: categories,
    status: categoryStatus,
    error: categoryError,
  } = useAppSelector(selectCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryIn = searchParams.get("category") || "";

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  let content;

  if (categoryStatus === "pending") {
    content = <p>Loading...</p>;
  } else if (categoryStatus === "failed") {
    content = <p>Error: {categoryError}</p>;
  } else if (categoryStatus === "succeeded") {
    content = categories.map((category) => (
      <div className="flex gap-2 items-center" key={category.id}>
        <input
          type="radio"
          id={String(category.id)}
          name="category"
          value={category.category_name}
          onChange={handleChange}
          checked={categoryIn === category.category_name}
        />
        <label htmlFor={String(category.id)} className="capitalize">
          {category.category_name}
        </label>
      </div>
    ));
  }

  return <Accoridon title="Categories">{content}</Accoridon>;
};

const BrandsFilter = () => {
  const {
    data: brands,
    status: brandsStatus,
    error: brandsError,
  } = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrands = searchParams.get("brands")?.split("-") || [];

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  let content;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(
      (prev) => {
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
      },
      { replace: true },
    );
  };

  if (brandsStatus === "pending") {
    content = <p>Loading...</p>;
  } else if (brandsStatus === "failed") {
    content = <p>Error: {brandsError}</p>;
  } else if (brandsStatus === "succeeded") {
    content = brands.map((brand) => (
      <div className="flex gap-2 items-center" key={brand.id}>
        <input
          type="checkbox"
          id={String(brand.id)}
          name="brand"
          value={brand.brand_name}
          onChange={handleChange}
          checked={selectedBrands.indexOf(brand.brand_name) !== -1}
        />
        <label htmlFor={String(brand.id)} className="capitalize">
          {brand.brand_name}
        </label>
      </div>
    ));
  }

  return <Accoridon title="Brands">{content}</Accoridon>;
};
