export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
}
