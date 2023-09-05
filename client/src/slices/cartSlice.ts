import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from './productsApiSlice';
import { updateCart } from '../utils/cartUtils';

export interface CartItems extends Product {
	qty: number;
}

export interface CartState {
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
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);

			return updateCart(state);
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
