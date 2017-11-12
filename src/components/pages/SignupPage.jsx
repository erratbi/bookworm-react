import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/users';
import SignupForm from '../forms/SignupForm';

class SignupPage extends Component {
	static propTypes = {
		signup: PropTypes.func.isRequired,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
	};

	submit = data =>
		this.props.signup(data).then(() => this.props.history.push('/dashboard'));

	render() {
		return (
			<div>
				<h1>Signup page</h1>
				<SignupForm submit={this.submit} />
			</div>
		);
	}
}

export default connect(null, { signup })(SignupPage);
