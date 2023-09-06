import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	userInfo: any;
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
	},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
