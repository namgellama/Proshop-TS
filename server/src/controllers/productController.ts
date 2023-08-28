import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { db } from '../config/db.server';

// @desc Fetch all products
// @route GET /api/products
// access Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await db.product.findMany({});
	res.json(products);
});

// @desc Fetch  asingle product
// @route GET /api/products/:id
// access Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
	const product = await db.product.findFirst({
		where: { id: parseInt(req.params.id) },
	});

	if (product) {
		return res.json(product);
	} else {
		res.status(404);
		throw new Error('Resource not found');
	}
});

export { getProducts, getProductById };
