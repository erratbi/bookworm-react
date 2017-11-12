import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case USER_LOGGED_IN:
			return action.payload;

		case USER_LOGGED_OUT:
			return {};
		default:
			return state;
	}
};
