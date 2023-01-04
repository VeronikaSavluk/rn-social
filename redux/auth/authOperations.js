import db from '../../firebase/config';
import {authSlice} from './authReduser';

const {
	updateUserProfile,
	authSignOut,
	authStateChange
} = authSlice.actions;

export const authSignUpUser = ({nickname, email, password, image}) => async (
	dispatch, getState) => {
	try {
		const {user} = await db
		.auth()
		.createUserWithEmailAndPassword(email, password);
		await user.updateProfile({
			displayName: nickname,
		});

		const {uid, displayName} = await db.auth().currentUser;

		dispatch(updateUserProfile({
			userId: uid,
			nickname: displayName,
			email: email,
			image: image,
		}));
	} catch (error) {
		console.log(error.message);
	}
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
	try {
		const {user} = await db
		.auth()
		.signInWithEmailAndPassword(email, password);
		dispatch(updateUserProfile({userId: user.uid}));
	} catch (error) {
		console.log(error.message);
		console.log(error.code);
	};
};

export const authSignOutUser = () => async (
dispatch, getState) => {
 await db.auth().signOut();
 dispatch(authSignOut());
	};

export const authStateChangeUser = () => async (
	dispatch, getState) => {
	await db.auth().onAuthStateChanged((user) => {
		if(user) {
			const userUpdateProfile = {
				userId: user.uid,
				nickname: user.displayName,
				email: user.email,
				image: user.image,
			};
			dispatch(updateUserProfile(userUpdateProfile))
			dispatch(authStateChange({stateChange: true}))
		};
	});
};