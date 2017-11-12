import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isEmpty, isEmail } from 'validator';
import InlineMessage from '../messages/InlineMessage';

class SignupForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
	};

	state = {
		data: {
			email: '',
			password: '',
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
		const { email, password } = data;
		if (isEmpty(email)) errors.email = 'The email address cannot be blank';
		else if (!isEmail(email)) errors.email = 'The email address is not valid';
		if (isEmpty(password)) errors.password = 'The password cannot be blank';
		return errors;
	};

	render() {
		const { loading, errors, data } = this.state;
		return (
			<div>
				<Form noValidate onSubmit={this.onSubmit}>
					<Form.Field error={!!errors.email}>
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							id="email"
							name="email"
							value={data.email}
							onChange={this.onChange}
							placeholder="Type your email address"
						/>
						{errors.email && <InlineMessage text={errors.email} />}
					</Form.Field>

					<Form.Field error={!!errors.password}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={data.password}
							onChange={this.onChange}
							placeholder="Type your password"
						/>

						{errors.password && <InlineMessage text={errors.password} />}
					</Form.Field>
					<Button loading={loading} primary>
						Signup
					</Button>
				</Form>
			</div>
		);
	}
}

export default SignupForm;
