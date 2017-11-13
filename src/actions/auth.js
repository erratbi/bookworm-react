import api from '../api';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	payload: user,
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
	api.user.login(credentials).then(user => {
		localStorage.bookwormJWT = user.token;
		return dispatch(userLoggedIn(user));
	});

export const logout = () => dispatch => {
	localStorage.removeItem('bookwormJWT');
	dispatch(userLoggedOut());
};

export const confirm = token => dispatch =>
	api.user.confirm(token).then(user => {
		localStorage.bookwormJWT = user.token;
		return dispatch(userLoggedIn(user));
	});

export const resetPasswordRequset = ({ email }) => () =>
	api.user.resetPasswordRequset(email);
