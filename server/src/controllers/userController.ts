import { Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler';
import { db } from '../config/db.server';

interface LoginRequestBody {
	email: string;
	password: string;
	isAdmin: boolean;
}
interface LoginResponse {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
}

import bcrypt from 'bcryptjs';

const matchPassword = async (
	enteredPassword: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(enteredPassword, hashedPassword);
};

// @desc Auth user & get token
// @route POST /api/users/login
// access Public
const authUser = asyncHandler(
	async (
		req: Request<{}, {}, LoginRequestBody>,
		res: Response<LoginResponse>
	) => {
		const { email, password } = req.body;

		const user = await db.user.findUnique({
			where: { email },
		});

		if (user && (await matchPassword(password, user.password))) {
			res.json({
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
const registerUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('register user');
});

// @desc Logout user /clear cookie
// @route POST /api/users/logout
// access Private
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	res.send('logout user');
});

// @desc Get user profile
// @route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
	res.send('Get user profile');
});

// @desc Update user profile
// @route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
	res.send('update user profile');
});

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
