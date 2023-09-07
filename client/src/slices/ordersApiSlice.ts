import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';
import { Product } from '../interfaces/product';

interface OrderItems extends Product {
	qty: number;
}

interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface Order {
	id: number;
	orderItems: OrderItems[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	itemsPrice: number;
	totalPrice: number;
	shippingPrice: number;
	taxPrice: number;
}

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation<Order, { data: Partial<Order> }>({
			query: ({ data }) => ({
				url: ORDERS_URL,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useCreateOrderMutation } = ordersApiSlice;
