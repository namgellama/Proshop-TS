import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';
import { Product } from '../interfaces/product';

interface OrderItems extends Product {
	qty: number;
	product: Product;
}

interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface User {
	name: string;
	email: string;
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
	user: User;
	isDelivered: boolean;
	isPaid: boolean;
	deliveredAt: string;
	paidAt: string;
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
		getOrderDetails: builder.query<Order, number>({
			query: (orderId: number) => ({
				url: `${ORDERS_URL}/${orderId}`,
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
	ordersApiSlice;
