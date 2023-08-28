import express, { Request, Response } from 'express';
import { db } from '../config/db.server';
import asyncHandler from '../middlewares/asyncHandler';
import { getProducts, getProductById } from '../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
