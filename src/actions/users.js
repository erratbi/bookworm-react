import api from '../api';
import { userLoggedIn } from './auth';

// eslint-disable-next-line
export const signup = credentials => dispatch =>
	api.user.signup(credentials).then(user => {
		localStorage.bookwormJWT = user.token;
		return dispatch(userLoggedIn(user));
	});
