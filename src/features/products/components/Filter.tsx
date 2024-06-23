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

type FilterSectionProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchParams: URLSearchParams;
};

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleClear = () => {
    setSearchParams()
  }

  return (
    <div className="border border-border rounded-md shadow-md p-2 h-fit sticky top-0 hidden xl:block">
      <header className="flex justify-between items-center p-2">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button btnType="ghost" onClick={handleClear}>Clear</Button>
      </header>
      <button
        className="absolute top-4 right-4 border-0 bg-transparent text-2xl cursor-pointer hidden md:block"
      >
        {/* <CloseOutlined /> */}
      </button>
      <CategoryFilter searchParams={searchParams} handleChange={handleChange} />
      <BrandsFilter searchParams={searchParams} handleChange={handleChange} />
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
      <Accoridon title="Availability">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="out_of_stock"
            value="include_out_of_stock"
            name="stock"
            onChange={handleChange}
          />
          <label htmlFor="out_of_stock" className="capitalize">
            Include out of stock
          </label>
        </div>
      </Accoridon>
    </div>
  );
};

export default Filter;

const CategoryFilter = ({ handleChange, searchParams }: FilterSectionProps) => {
  const {
    data: categories,
    status: categoryStatus,
    error: categoryError,
  } = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
        />
        <label htmlFor={String(category.id)} className="capitalize">
          {category.category_name}
        </label>
      </div>
    ));
  }

  return <Accoridon title="Categories">{content}</Accoridon>;
};

const BrandsFilter = ({ handleChange, searchParams }: FilterSectionProps) => {
  const {
    data: brands,
    status: brandsStatus,
    error: brandsError,
  } = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  let content;

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
        />
        <label htmlFor={String(brand.id)} className="capitalize">
          {brand.brand_name}
        </label>
      </div>
    ));
  }

  return <Accoridon title="Brands">{content}</Accoridon>;
};
