import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
	};

	submit = data =>
		this.props.login(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<div>
				<h1>Login Page</h1>
				<LoginForm submit={this.submit} />
				<Link to="/forgot_password">Forgot Password</Link>
			</div>
		);
	}
}

export default connect(null, { login })(LoginPage);
