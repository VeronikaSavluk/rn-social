import {createSlice} from '@reduxjs/toolkit';

const state = {
	userId: null,
	nickname: null,
	stateChange: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: state,
	reducers: {
		updateUserProfile: (state, {payload}) => ({
			...state,
			userId: payload.userId,
			nickname: payload.nickname,
			image: payload.image,
		}),
		authStateChange: (state, {payload}) => ({
			...state, stateChange: payload.stateChange
		}),
		authSignOut: () => state, 
	},
});