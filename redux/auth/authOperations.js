import db from '../../firebase/config';
import {authSlice} from './authReduser';

export const authSignUpUser = ({nickname, email, password}) => async (
	dispatch, getState) => {
	try {
		const {user} = await db
		.auth()
		.createUserWithEmailAndPassword(email, password);
		dispatch(authSlice.actions.updateUserProfile({userId: user.uid}))
		console.log('user', user);
	} catch (error) {
		console.log(error.message);
	}
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
	try {
		const {user} = await db
		.auth()
		.signInWithEmailAndPassword(email, password);
		dispatch(authSlice.actions.updateUserProfile({userId: user.uid}))
		console.log('user', user);
	} catch (error) {
		console.log(error.message);
		console.log(error.code);
	}
};

export const authSignOutUser = async (dispatch, getState) => {};