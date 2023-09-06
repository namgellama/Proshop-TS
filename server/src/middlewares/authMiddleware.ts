import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { db } from '../config/db.server';
import asyncHandler from './asyncHandler';

interface DecodedToken {
	userId: number;
}

// Protect routes
const protect = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		let token;

		// Read the JWT from the cookie
		token = req.cookies.jwt;

		if (token) {
			try {
				const decoded = jwt.verify(
					token,
					process.env.JWT_SECRET as Secret
				) as DecodedToken;

				const user = await db.user.findUnique({
					where: { id: decoded.userId },
				});

				if (user !== null) {
					req.user = user; // Assign the user only if it's not null
					next();
				} else {
					res.status(401);
					throw new Error('Not authorized, user not found');
				}
			} catch (error) {
				res.status(401);
				throw new Error('Not authorized, token failed');
			}
		} else {
			res.status(401);
			throw new Error('Not authorized, no token');
		}
	}
);

// Admin middleware
const admin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		throw new Error('Not authorized as admin');
	}
};

export { admin, protect };
