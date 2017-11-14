import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		submit: PropTypes.func.isRequired,
	};

	state = {
		data: {
			token: this.props.token,
			password: '',
			passwordConfirmation: '',
		},
		loading: false,
		errors: {},
	};

	onChange = e =>
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value },
		});

	onSubmit = e => {
		if (this.state.loading) return;
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = data => {
		const errors = {};
		if (!data.password) errors.password = "Password can't be blank";
		else if (data.password !== data.passwordConfirmation) errors.password = 'Passwords must match';
		return errors;
	};

	render() {
		const { data, loading, errors } = this.state;
		return (
			<div>
				{!!errors.global && (
					<Message negative>
						<Message.Header>Something went wrong</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				<Form onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.password}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							value={data.password}
							onChange={this.onChange}
						/>
					</Form.Field>
					{errors.password && <InlineError text={errors.password} />}
					<Form.Field error={!!errors.passwordConfirmation}>
						<label htmlFor="passwordConfirmation">Password Confirmation</label>
						<input
							type="password"
							id="passwordConfirmation"
							name="passwordConfirmation"
							placeholder="Password confirmation"
							value={data.passwordConfirmation}
							onChange={this.onChange}
						/>
					</Form.Field>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
					<Button loading={loading} primary>
						Save password
					</Button>
				</Form>
			</div>
		);
	}
}

export default ResetPasswordForm;
