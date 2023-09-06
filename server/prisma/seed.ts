import { db } from '../src/config/db.server';
import products from '../src/data/products';
import bcrypt from 'bcryptjs';

interface Proudct {
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

interface User {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

async function seed() {
	// await Promise.all(
	// 	getUsers().map((user) => {
	// 		return db.user.create({
	// 			data: {
	// 				name: user.name,
	// 				email: user.email,
	// 				password: user.password,
	// 				isAdmin: user.isAdmin,
	// 			},
	// 		});
	// 	})
	// );
	const user = await db.user.findFirst({
		where: {
			id: 1,
		},
	});
	await Promise.all(
		getProducts().map((product) => {
			const {
				name,
				image,
				description,
				brand,
				category,
				price,
				countInStock,
				rating,
				numReviews,
			} = product;
			return db.product.create({
				data: {
					name,
					image,
					description,
					brand,
					category,
					price,
					countInStock,
					rating,
					numReviews,
					userId: user?.id || 0,
				},
			});
		})
	);
}

seed();

function getUsers(): Array<User> {
	return [
		{
			name: 'admin',
			email: 'admin@gmail.com',
			password: bcrypt.hashSync('admin', 10),
			isAdmin: true,
		},
		{
			name: 'John Doe',
			email: 'john@gmail.com',
			password: bcrypt.hashSync('admin', 10),
			isAdmin: false,
		},
		{
			name: 'Jane Doe',
			email: 'jane@gmail.com',
			password: bcrypt.hashSync('admin', 10),
			isAdmin: false,
		},
	];
}

function getProducts(): Array<Proudct> {
	return products;
}
