import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { verifyToken, resetPassword } from '../../actions/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

class ResetPasswordPage extends Component {
	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		match: PropTypes.shape({
			params: PropTypes.shape({
				token: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		resetPassword: PropTypes.func.isRequired,
		verifyToken: PropTypes.func.isRequired,
	};

	state = {
		success: false,
		loading: true,
	};

	componentDidMount = () => {
		const { token } = this.props.match.params;

		this.props
			.verifyToken(token)
			.then(() => this.setState({ loading: false, success: true }))
			.catch(() => this.setState({ loading: false, success: false }));
	};

	submit = data => this.props.resetPassword(data).then(() => this.props.history.push('/login'));

	render() {
		const { loading, success } = this.state;
		const { token } = this.props.match.params;
		return (
			<div>
				{loading && (
					<Message icon>
						<Icon name="circle notched" loading />
						<Message.Content>
							<Message.Header>Checking your token, please wait...</Message.Header>
						</Message.Content>
					</Message>
				)}
				{!loading && success && <ResetPasswordForm submit={this.submit} token={token} />}
				{!loading &&
					!success && (
						<Message negative icon>
							<Icon name="warning sign" />
							<Message.Content>
								<Message.Header>Oops, Something went wrong</Message.Header>
							</Message.Content>
						</Message>
					)}
			</div>
		);
	}
}

const mapDispatchToProps = { verifyToken, resetPassword };

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
