import bcrypt from 'bcryptjs';
import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import ms from 'ms';

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);

	return bcrypt.hash(password, salt);
};

const matchPassword = async (
	enteredPassword: string,
	hashedPassword: string
) => {
	return await bcrypt.compare(enteredPassword, hashedPassword);
};

const generateToken = (res: Response, userId: number) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
		expiresIn: '30d', // 30 days
		algorithm: 'HS256',
	});

	// Set JWT as HTTP-Only Cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: ms('30d'), // 30 days
	});
};

export { generateToken, hashPassword, matchPassword };
