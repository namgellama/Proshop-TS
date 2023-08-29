import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from './productsApiSlice';

interface CartItems extends Product {
	qty: number;
}

interface CartState {
	cartItems: CartItems[];
	itemsPrice: number;
	totalPrice: number;
	shippingPrice: number;
	taxPrice: number;
}

const storedCart = localStorage.getItem('cart');

const initialState: CartState = storedCart
	? JSON.parse(storedCart)
	: { cartItems: [] };

const addDecimals = (num: number) => {
	return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItems>) => {
			const item = action.payload;

			const existItem = state.cartItems.find((x) => x.id === item.id);

			if (existItem) {
				state.cartItems = state.cartItems.map((x) =>
					x.id === existItem.id ? item : x
				);
			} else {
				state.cartItems = [...state.cartItems];
			}

			// Calculate items price
			state.itemsPrice = addDecimals(
				state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
			);

			// Calculate shipping price (If order is over $100 then free, else $10 shipping)
			state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

			// Calculate tax price
			state.taxPrice = addDecimals(
				Number((0.15 * state.itemsPrice).toFixed(2))
			);

			// Calculate total price
			state.totalPrice = Number(
				(state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)
			);

			localStorage.setItem('cart', JSON.stringify(state));
		},
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
