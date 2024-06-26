import { SearchOutlined } from "@ant-design/icons";

const ProductSearch = () => {
  return (
    <div
      className={`relative group flex items-center rounded-md border border-border bg-background max-w-[20rem] md:max-w-[25rem] lg:max-w-[30rem] w-full mx-auto focus-within:outline focus-within:outline-1 focus-within:outline-blue-500`}
    >
      <label htmlFor="search_products" className="sr-only">
        Search for products
      </label>
      <span className="p-1 sm:p-2 block text-lg cursor-pointer bg-background rounded-md rounde">
        <SearchOutlined />
      </span>
      <input
        type="search"
        id="search_products"
        className={`w-full p-1 sm:p-2  focus:outline-none bg-background`}
        placeholder="Search by product name"
      />
      <div className="hidden group-focus-within:block absolute top-[3rem] border border-border p-2 rounded-sm bg-background min-h-fit overflow-y-auto w-full z-50">
        <p className="p-2 border-b border-border" tabIndex={0}>
          Product 1
        </p>
      </div>
    </div>
  );
};

export default ProductSearch;
