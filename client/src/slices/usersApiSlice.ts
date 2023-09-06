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
			query: ({ data }) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
		register: builder.mutation<User, { data: Partial<User> }>({
			query: ({ data }) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	usersApiSlice;
