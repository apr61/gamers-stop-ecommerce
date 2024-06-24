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
		<li className="flex gap-6 p-2 flex-col border-y border-border md:flex-row">
			<div className="max-w-40 w-full h-20 mx-auto md:mx-0">
				<img
					className="object-cover brightness-95 w-full h-full"
					src={cartItem.images[0]}
					alt={cartItem.name}
					loading="lazy"
				/>
			</div>
			<div className="grid gap-2 w-full md:grid-cols-2">
				<div className="flex flex-col space-y-2">
					<Link
						to={`/store/${cartItem.slug_url}`}
						className="text-lg hover:text-primary"
					>
						{cartItem.name}
					</Link>
					<p className="text-lg">{currencyFormatter(cartItem.price)}</p>
				</div>
				<div className="flex justify-between items-center w-full md:flex-row flex-col">
					<QuantityCounter cartItem={cartItem} />
					<Button
						className="text-red-500"
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
