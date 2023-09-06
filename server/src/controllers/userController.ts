import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { db } from '../config/db.server';
import { generateToken, hashPassword, matchPassword } from '../utils/auth';
import jwt, { Secret } from 'jsonwebtoken';
import ms from 'ms';
import { User, UserResponse } from '../interfaces/userInterface';

interface AppRequest<T> extends Request {
	body: T;
}

type UserRequest = AppRequest<{ user: { account: string } }>;

// @desc Auth user & get token
// @route POST /api/users/login
// access Public
const authUser = asyncHandler(
	async (req: Request<{}, {}, User>, res: Response<UserResponse>) => {
		const { email, password } = req.body;

		const user = await db.user.findUnique({
			where: { email },
		});

		if (user && (await matchPassword(password, user.password))) {
			generateToken(res, user.id);

			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(401);
			throw new Error('Invalid email or password');
		}
	}
);

// @desc Register user
// @route POST /api/users
// access Public
const registerUser = asyncHandler(
	async (req: Request<{}, {}, User>, res: Response<UserResponse>) => {
		const { name, email, password } = req.body;
		const hashedPassword = await hashPassword(password);

		const userExists = await db.user.findUnique({ where: { email } });

		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}

		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		if (user) {
			generateToken(res, user.id);

			res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	}
);

// @desc Logout user /clear cookie
// @route POST /api/users/logout
// access Private
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });

	res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Get user profile
// @route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
	const user = await db.user.findUnique({ where: { id: req.user.id } });

	if (user) {
		res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not fouhnd');
	}
});

// @desc Update user profile
// @route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler(
	async (req: Request<{}, {}, User>, res: Response) => {
		const user = await db.user.findUnique({ where: { id: req.user.id } });

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await db.user.update({
				where: {
					id: req.user.id,
				},
				data: user,
			});

			res.status(200).json({
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			});
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	}
);

// @desc Get users
// @route PUT /api/users
// access Private/Admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
	res.send('get users');
});

// @desc Get user by ID
// @route PUT /api/users/:id
// access Private/Admin
const getUserById = asyncHandler(async (req: Request, res: Response) => {
	res.send('get user by id');
});

// @desc Delete users
// @route DELETE /api/users/:id
// access Private/Admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('delete user');
});

// @desc Update user
// @route PUT /api/users/:id
// access Private/Admin
const updateUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('update user');
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser,
};
