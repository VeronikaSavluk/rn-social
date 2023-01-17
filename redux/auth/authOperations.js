import db from '../../firebase/config';
import {authSlice} from './authReduser';
import { Alert } from 'react-native';

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
			photoURL: image,
		});

		const {uid, displayName, photoURL} = await db.auth().currentUser;

		dispatch(updateUserProfile({
			userId: uid,
			nickname: displayName,
			email: email,
			image: photoURL,
		}));
	} catch (error) {
		console.log(error.message);
		Alert.alert('Registration', `No user created. ${error.message} Try again`, [
			{
				text: 'Ok',
				onPress: () => console.log('Ok Pressed'),
			},
		]);
	}
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
	try {
		const {user} = await db
		.auth()
		.signInWithEmailAndPassword(email, password);

		dispatch(updateUserProfile({
			userId: user.uid,
			nickname: user.displayName,
			email: user.email,
			image: user.photoURL}));
	} catch (error) {
		console.log(error.message);
		console.log(error.code);
		Alert.alert('Login', 'Not found such user. The user may have been deleted', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
			},
		]);
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
				image: user.photoURL,
			};
			dispatch(updateUserProfile(userUpdateProfile))
			dispatch(authStateChange({stateChange: true}))
		};
	});
};