import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import { isEmail, isEmpty } from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	};

	state = {
		data: {
			email: '',
		},
		loading: false,
		errors: {},
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value },
		});

	onSubmit = () => {
		if (this.state.loading) return;
		const { data } = this.state;
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props
				.submit(data)
				.catch(err =>
					this.setState({ errors: err.response.data.errors, loading: false }),
				);
		}
	};

	validate = data => {
		const errors = {};
		const { email } = data;
		if (isEmpty(email)) errors.email = 'Email cannot be blank';
		else if (!isEmail(email)) errors.email = 'This is not a valid  email';
		return errors;
	};
	render() {
		const { data, errors, loading } = this.state;

		return (
			<div>
				{!!errors.global && (
					<Message negative>
						<Message.Header>Something went wrong</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				<Form noValidate onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.email}>
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							id="email"
							name="email"
							value={data.email}
							onChange={this.onChange}
							placeholder="Email address"
						/>
						{errors.email && <InlineError text={errors.email} />}
					</Form.Field>
					<Button loading={loading} primary>
						Login
					</Button>
				</Form>
			</div>
		);
	}
}

export default ForgotPasswordForm;
