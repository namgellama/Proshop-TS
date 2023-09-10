export interface Product {
	id: number;
	name: string;
	image: string;
	description: string;
	brand: string;
	category: string;
	price: number;
	countInStock: number;
	rating: number;
	numReviews: number;
}

interface OrderItems extends Product {
	qty: number;
	productId: number;
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

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
}
