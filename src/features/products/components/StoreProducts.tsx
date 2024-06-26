import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { searchProductsFn, selectProductsSearch } from "../productSlice";
import { ChangeEvent, useEffect, useMemo } from "react";
import PageLoader from "@/components/PageLoader";
import {
  Product,
  ProductFilterType,
  ProductSortType,
  ProductStock,
} from "@/types/api";
import { currencyFormatter } from "@/utils/currencyFormatter";
import Button from "@/components/ui/Button";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import Select from "@/components/ui/Select";
import Pagination from "@/components/ui/Pagination";
import { selectBrands } from "@/features/brands/brandsSlice";
import { selectCategories } from "@/features/categories/categorySlice";
import { increment } from "@/features/cart/cartSlice";
import { FilterOutlined } from "@ant-design/icons";
import { useDisclosure } from "@/hooks/useDisclosure";

const StoreProducts = () => {
  const { isOpen, close, open } = useDisclosure();

  return (
    <div className="max-w-[100rem] w-full mx-auto grid grid-cols-1 lg:grid-cols-[22rem_auto] gap-8">
      <Filter isOpen={isOpen} close={close} />
      <div className="flex gap-4 flex-col">
        <Button
          btnType="icon"
          onClick={open}
          className="block lg:hidden ml-auto"
        >
          <FilterOutlined className="text-2xl" />
        </Button>
        <ProductSort />
        <ProductListWrapper />
      </div>
    </div>
  );
};

export default StoreProducts;

const ProductListWrapper = () => {
  const [searchParams, _] = useSearchParams();
  const {
    data: productData = [],
    status,
    error,
  } = useAppSelector(selectProductsSearch);
  const { data: brandData } = useAppSelector(selectBrands);
  const { data: categoryData } = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;
  const rating = searchParams.get("rating") ? +searchParams.get("rating")! : 5;
  const availability = searchParams.get("availability") || "inStock";
  const categoryIn = searchParams.get("category") || "";
  const selectedBrands = useMemo(
    () => searchParams.get("brands")?.split("-") || [],
    [searchParams],
  );
  const sort = searchParams.get("sort") || "price_low_to_high";
  const itemsPerPage = 6;

  useEffect(() => {
    const paginationFrom = (page - 1) * itemsPerPage;
    const paginationTo = paginationFrom + (itemsPerPage - 1);
    const filteredCate = categoryData.find(
      (cate) => cate.category_name === categoryIn,
    );
    const categoryId = filteredCate ? filteredCate.id : 0;
    const brands = brandData
      .filter((brand) => selectedBrands.indexOf(brand.brand_name) !== -1)
      .map((brand) => brand.id) || [];

    const query: ProductFilterType = {
      page: {
        from: paginationFrom,
        to: paginationTo,
      },
      rating: rating,
      sort: sort as ProductSortType,
      stock: availability as ProductStock,
      category: categoryId,
      brand: brands,
    };
    dispatch(searchProductsFn(query));
  }, [sort, page, availability, categoryIn, selectedBrands]);

  if (status === "pending") return <PageLoader />;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div>
      <ItemsGridLayout className="grid-cols-none md:grid-cols-2 xl:grid-cols-3">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ItemsGridLayout>
      <ProductPagination />
    </div>
  );
};

const ProductPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalItems } = useAppSelector(selectProductsSearch);
  const page = searchParams.get("page") ? +searchParams.get("page")! : 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });
  };
  console.log(totalPages)
  return (
    <div className="flex justify-between mt-10">
      <p>
        Showing {page} of {totalPages} pages
      </p>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
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
        {product.quantity > 0 ? (
          <Button
            className="w-full"
            onClick={() => dispatch(increment({ ...product, qty: 1 }))}
          >
            Add to cart
          </Button>
        ) : (
          <Button className="w-full" disabled={true}>
            Out of stock
          </Button>
        )}
      </div>
    </article>
  );
};

const ProductSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "price_low_to_high";
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      setSearchParams(
        (prev) => {
          prev.set("sort", value);
          return prev;
        },
        { replace: true },
      );
    }
  };
  return (
    <Select
      className="w-fit ml-auto hidden lg:block"
      onChange={handleChange}
      value={sort}
    >
      <Select.Option value="">Sort By</Select.Option>
      <Select.Option value="price_low_to_high">Price Low to High</Select.Option>
      <Select.Option value="price_high_to_low">Price High to Low</Select.Option>
    </Select>
  );
};
