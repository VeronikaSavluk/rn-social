import db from '../../firebase/config';

const authSignUpUser = ({nickname, email, password}) => async (dispatch, getState) => {
	try{
		const user = await db.auth().createUserWithEmailAndPassword();
		console.log(user);
	} catch (err) {
		console.log(err.message);
	}
};
const authSignInUser = async (dispatch, getState) => {};
const authSignOutUser = async (dispatch, getState) => {};

export {
	authSignInUser,
	authSignUpUser,
	authSignOutUser
};