import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { searchProductsFn, selectProductsSearch } from "../productSlice";
import { ChangeEvent, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import { Product } from "@/types/api";
import { currencyFormatter } from "@/utils/currencyFormatter";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";

const StoreProducts = () => {
  return (
    <div className="max-w-[100rem] w-full mx-auto grid grid-cols-1 xl:grid-cols-[25rem_auto] gap-8">
      <Filter />
      <div className="flex gap-4 flex-col">
        <ProductSort />
        <ProductListWrapper />
      </div>
    </div>
  );
};

export default StoreProducts;

const ProductListWrapper = () => {
  const { data, totalItems, status, error } =
    useAppSelector(selectProductsSearch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(searchProductsFn());
  }, []);

  if (status === "pending") return <PageLoader />;
  if (status === "failed") return <p>{error}</p>;

  const page = 1;
  const itemsPerPage = 12;
  const totalPages = Math.floor(totalItems / itemsPerPage);
  const setPage = () => {};

  return (
    <div>
      <ItemsGridLayout className="grid-cols-none md:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ItemsGridLayout>
      <div className="flex justify-between mt-10">
        <p>
          Showing {page} of {totalPages} pages
        </p>
        <Pagination currentPage={1} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="w-full p-2 border border-border shadow-md rounded-md">
      <div className="h-[15rem] rounded-md overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <Link to={`./${product.slug_url}`} className="text-xl font-bold">
          {product.name}
        </Link>
        <p className="text-lg font-semibold">
          {currencyFormatter(product.price)}
        </p>
        <Button className="w-full">Add to cart</Button>
      </div>
    </article>
  );
};

const ProductSort = () => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };
  return (
    <Select
      className="w-fit ml-auto"
      onChange={handleOnChange}
      value={"price_low_to_high"}
    >
      <Select.Option value="">Sort By</Select.Option>
      <Select.Option value="price_low_to_high">Price Low to High</Select.Option>
      <Select.Option value="price_high_to_low">Price High to Low</Select.Option>
    </Select>
  );
};
