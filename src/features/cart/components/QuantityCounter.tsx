import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrement, getCartItemById, increment } from "../cartSlice";
import { CartItem } from "@/types/api";
import Button from "@/components/ui/Button";

type QuantityCounterProps = {
	cartItem: CartItem;
};

function QuantityCounter({ cartItem }: QuantityCounterProps) {
	const dispatch = useAppDispatch();
	const existsInCart = useAppSelector(getCartItemById(cartItem.id));
	return existsInCart ? (
		<div className="flex gap-2 items-center">
			<Button
				className="border border-border cursor-pointer px-2 py-1 rounded font-medium"
				onClick={() => dispatch(decrement(cartItem))}
				btnType="ghost"
			>
				-
			</Button>
			<span>{existsInCart && existsInCart.qty}</span>
			<Button
				className="border border-border cursor-pointer px-2 py-1 rounded font-medium"
				onClick={() => dispatch(increment(cartItem))}
				btnType="ghost"
			>
				+
			</Button>
		</div>
	) : null;
}

export default QuantityCounter;
