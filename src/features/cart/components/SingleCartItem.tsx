import DeleteIcon from "@mui/icons-material/Delete";
import { currencyFormatter } from "@/utils/currencyFormatter";
import QuantityCounter from "./QuantityCounter";
import { Link } from "react-router-dom";
import { CartItem } from "@/types/api";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart } from "../cartSlice";
import Button from "@/components/ui/Button";

type CartItemProps = {
  cartItem: CartItem;
};

function SingleCartItem({ cartItem }: CartItemProps) {
  const dispatch = useAppDispatch();
  return (
    <li className="flex gap-6 py-4 flex-col border-y border-border md:flex-row">
      <div className="w-full h-[10rem] mx-auto md:mx-0">
        <img
          className="object-cover brightness-95 w-full h-full"
          src={cartItem.images[0]}
          alt={cartItem.name}
          loading="lazy"
        />
      </div>
      <div className="grid gap-2 w-full grid-cols-1">
        <div className="flex flex-col space-y-2 mr-auto w-full">
          <Link
            to={`/store/${cartItem.slug_url}`}
            className="text-lg hover:text-primary"
          >
            {cartItem.name}
          </Link>
          <p className="text-lg">{currencyFormatter(cartItem.price)}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <QuantityCounter cartItem={cartItem} />
          <Button
            className="text-red-500 ml-auto"
            onClick={() => dispatch(removeFromCart(cartItem))}
            btnType="icon"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default SingleCartItem;
