import { createSelector, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "@/types/api";
import { RootState } from "@/store/store";

type CartState = {
	cart: CartItem[];
};

const initialState: CartState = {
	cart: JSON.parse(localStorage.getItem("gamers-stop-cart") as string) || [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem: CartItem = action.payload;
			state.cart.push(newItem);
		},
		removeFromCart: (state, action) => {
			const item: CartItem = action.payload;
			state.cart = state.cart.filter((cartItem) => cartItem.id !== item.id);
		},
		increment: (state, action) => {
			const newItem: CartItem = action.payload;
			let exisitingItemIndex = state.cart.findIndex(
				(cartItem) => cartItem.id === newItem.id,
			);
			if (exisitingItemIndex !== -1) {
				const exisitingItem = state.cart[exisitingItemIndex];
				const newQty =
					exisitingItem.qty < exisitingItem.quantity
						? exisitingItem.qty + 1
						: exisitingItem.quantity;
				state.cart[exisitingItemIndex] = { ...exisitingItem, qty: newQty };
			} else {
				state.cart.push(newItem);
			}
		},
		decrement: (state, action) => {
			const exisitingItemIndex = state.cart.findIndex(
				(cartItem) => cartItem.id === action.payload.id,
			);
			if (exisitingItemIndex !== -1) {
				const exisitingItem = state.cart[exisitingItemIndex];
				const newQty = exisitingItem.qty > 0 ? exisitingItem.qty - 1 : 0;
				if (newQty === 0) {
					state.cart.splice(exisitingItemIndex, 1);
				} else {
					state.cart[exisitingItemIndex] = { ...exisitingItem, qty: newQty };
				}
			}
		},
	},
});

export const getAllCartItems = (state: RootState) => state.cart.cart;

export const getTotalCost = (state: RootState) =>
	state.cart.cart.reduce((acc, curr) => {
		return acc + curr.price * curr.qty;
	}, 0);

export const getTotalItems = createSelector(
	(state: RootState) => state.cart.cart,
	(cart) => {
		const total = cart.reduce((acc, curr) => {
			return acc + curr.qty;
		}, 0);
		return total;
	},
);

export const getCartItemById = (id: number) =>
	createSelector(
		(state: RootState) => state.cart.cart,
		(cart) => cart.find((item) => item.id === id),
	);
export const { addToCart, removeFromCart, increment, decrement } =
	cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
