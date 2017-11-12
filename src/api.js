import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3030';

export default {
	user: {
		login: credentials =>
			axios.post('/api/auth', { credentials }).then(res => res.data.user),
		signup: credentials =>
			axios.post('/api/users', { credentials }).then(res => res.data.user),
	},
};
