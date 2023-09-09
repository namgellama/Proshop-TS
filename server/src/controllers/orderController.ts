import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { db } from '../config/db.server';
import { Order } from '../interfaces/orderInterface';
import { userInfo } from 'os';

// @desc Create new order
// @route POST /api/orders
// access Private
const addOrderItems = asyncHandler(
	async (req: Request<{}, {}, Order>, res: Response) => {
		const {
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		} = req.body;

		if (!orderItems || orderItems.length === 0) {
			res.status(400).json({ error: 'No order items' });
			return;
		}

		const user = await db.user.findUnique({
			where: { id: req.user.id },
		});

		if (!user) {
			res.status(401).json({ error: 'User not found' });
			return;
		}

		const createOrder = await db.order.create({
			data: {
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				paymentMethod,
				shippingAddress: {
					create: {
						address: shippingAddress.address,
						city: shippingAddress.city,
						postalCode: shippingAddress.postalCode,
						country: shippingAddress.country,
					},
				},
				user: {
					connect: { id: user.id },
				},
				orderItems: {
					create: orderItems.map((item) => ({
						name: item.name,
						qty: item.qty,
						image: item.image,
						price: item.price,
						product: {
							connect: { id: item.id },
						},
					})),
				},
			},
		});

		res.status(201).json(createOrder);
	}
);

// @desc Get logged in user orders
// @route POST /api/orders/mine
// access Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await db.order.findMany({
		where: {
			userId: req.user.id,
		},
	});

	res.json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// access Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
	const order = await db.order.findUnique({
		where: {
			id: parseInt(req.params.id),
		},

		include: {
			user: {
				select: {
					name: true,
					email: true,
				},
			},
			shippingAddress: {
				select: {
					address: true,
					city: true,
					postalCode: true,
					country: true,
				},
			},
			orderItems: {
				include: {
					product: true,
				},
			},
		},
	});

	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// access Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
	res.send('update order to paid');
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// access Private/Admin
const updateOrderToDelivered = asyncHandler(
	async (req: Request, res: Response) => {
		res.send('update order to delivered');
	}
);

// @desc Get all orders
// @route GET /api/orders
// access Private/Admin
const getOrders = asyncHandler(async (req: Request, res: Response) => {
	res.send('get all orders');
});

export {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
