import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export interface User {
	name: string;
	email: string;
	password: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<User, { data: Partial<User> }>({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useLoginMutation } = usersApiSlice;
