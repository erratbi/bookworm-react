import api from '../api';
import { USER_LOGGED_IN } from '../types';

const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	payload: user,
});

export const login = credentials => dispatch =>
	api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
export const logout = credentials => dispatch =>
	api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
