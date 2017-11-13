import React from 'react';
import { Message, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest, resendEmail } from '../../actions/auth';

class ForgotPasswordPage extends React.Component {
	static propTypes = {
		resendEmail: PropTypes.func.isRequired,
		resetPasswordRequest: PropTypes.func.isRequired,
	};

	state = {
		success: false,
	};

	submit = ({ email }) => {
		this.props
			.resetPasswordRequest(email)
			.then(() => this.setState({ success: true }));
	};

	render() {
		return (
			<div>
				{this.state.success ? (
					<Message icon success>
						<Icon name="checkmark" />
						<Message.Content>
							<Message.Header>
								Email has been sent, check your inbox
							</Message.Header>
							<p>
								<Button onClick={this.props.resendEmail}>Resend email</Button>
							</p>
						</Message.Content>
					</Message>
				) : (
					<div>
						<h1>Forgot your password</h1>
						<ForgotPasswordForm submit={this.submit} />
					</div>
				)}
			</div>
		);
	}
}

ForgotPasswordPage.propTypes = {};

export default connect(null, { resetPasswordRequest, resendEmail })(
	ForgotPasswordPage,
);
