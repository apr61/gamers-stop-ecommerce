import Button from "@/components/ui/Button";
import { getCartItemById, increment } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from "@/types/api";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="grid grid-cols-2">
          <p className="text-lg font-semibold">
            {currencyFormatter(product.price)}
          </p>
          <ProductButtons product={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

const ProductButtons = ({ product }: ProductCardProps) => {
  let content;
  const dispatch = useAppDispatch();
  const inCart = useAppSelector(getCartItemById(product.id));
  const navigate = useNavigate()

  content = inCart ? (
    <Button
      className="w-full"
      onClick={() => navigate('/cart')}
    >
      Go to cart
    </Button>
  ) : product.quantity > 0 ? (
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
  );

  return content;
};
