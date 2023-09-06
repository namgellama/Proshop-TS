import { createSlice } from '@reduxjs/toolkit';
import { User } from './usersApiSlice';

interface AuthState {
	userInfo: User | null;
}

const storedUserInfo = localStorage.getItem('userInfo');

const initialState: AuthState = storedUserInfo
	? JSON.parse(storedUserInfo)
	: { userInfo: null };

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
