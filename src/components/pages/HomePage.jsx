import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
	<div>
		<h1>HomePage</h1>
		{!isAuthenticated ? (
			<div>
				<Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
			</div>
		) : (
			<button onClick={logout}>Logout</button>
		)}
	</div>
);

HomePage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
};

export default connect(state => ({ isAuthenticated: !!state.user.token }), {
	logout: actions.logout,
})(HomePage);
