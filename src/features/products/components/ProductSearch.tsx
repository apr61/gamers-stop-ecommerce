import { SearchOutlined } from "@ant-design/icons";

const ProductSearch = () => {
  return (
    <div
      className={`relative group flex items-center rounded-md border border-border bg-background max-w-[20rem] md:max-w-[25rem] lg:max-w-[30rem] w-full mx-auto focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1`}
    >
      <label htmlFor="search_products" className="sr-only">
        Search for products
      </label>
      <span className="p-1 sm:p-2 block text-lg cursor-pointer bg-background rounded-md">
        <SearchOutlined />
      </span>
      <input
        type="search"
        className={`w-full p-1 sm:p-2 focus-visible:outline-none bg-background`}
        placeholder="Search by product name"
      />
      <div className="hidden group-focus-within:block absolute top-[3.25rem] border border-border p-2 rounded-sm bg-background min-h-fit overflow-y-auto w-full z-50">
        <p
          className="p-2 border-b border-border last-of-type:border-none"
          tabIndex={0}
        >
          Product 1
        </p>
      </div>
    </div>
  );
};

export default ProductSearch;
