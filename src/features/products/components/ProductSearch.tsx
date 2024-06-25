import {
  closeSearchBar,
  openSearchBar,
  selectSearchBarOpen,
} from "@/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SearchOutlined } from "@ant-design/icons";

const ProductSearch = () => {
  const isSearchBarOpen = useAppSelector(selectSearchBarOpen);
  const dispatch = useAppDispatch();

  const handleSearchBarStatus = () => {
    if (isSearchBarOpen) {
      dispatch(closeSearchBar());
    } else {
      dispatch(openSearchBar());
    }
  };

  return (
    <div
      className={`relative flex items-center rounded-md lg:border lg:border-gray-500 lg:max-w-[30rem] lg:w-full focus-within:outline focus-within:outline-1 focus-within:outline-blue-500 ${
        isSearchBarOpen
          ? "focus-within:outline focus-within:outline-1 focus-within:outline-blue-500 w-full border border-gray-500"
          : "w-fit"
      }`}
    >
      <label htmlFor="search_products" className="sr-only">
        Search for products
      </label>
      <span
        className="p-2 block text-lg cursor-pointer text-white"
        onClick={handleSearchBarStatus}
      >
        <SearchOutlined />
      </span>
      <input
        type="search"
        id="search_products"
        className={`bg-transparent lg:w-full lg:p-2 focus:outline-none text-white ${
          isSearchBarOpen ? "w-full p-2" : "w-0"
        }`}
        placeholder="Search product name"
        list="products-searched"
      />
      <div className="hidden absolute top-[3rem] border border-border p-2 rounded-sm bg-dimBlack min-h-fit overflow-y-auto w-full">
        {[...Array(5)].map((_, i) => (
          <p key={i} className="p-2 border-b border-border">
            Product 1
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
