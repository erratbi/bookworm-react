import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				token: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		confirm: PropTypes.func.isRequired,
	};
	state = {
		success: false,
		loading: true,
	};

	componentDidMount = () => {
		const token = this.props.match.params.token;
		this.props
			.confirm(token)
			.then(() => this.setState({ success: true, loading: false }))
			.catch(err => this.setState({ loading: false, success: false }));
	};

	render() {
		const { loading, success } = this.state;
		return (
			<div>
				{loading && (
					<Message icon info>
						<Icon name="circle notched" loading />
						<Message.Header>
							Validating your email, please wait...
						</Message.Header>
					</Message>
				)}

				{!loading &&
					success && (
						<Message icon success>
							<Icon name="checkmark" />
							<Message.Content>
								<Message.Header>Your email has been validated</Message.Header>
								<p>
									<Link to="/dashboard">Go to your dashboard</Link>
								</p>
							</Message.Content>
						</Message>
					)}
				{!loading &&
					!success && (
						<Message icon negative>
							<Icon name="warning sign" />
							<Message.Header>This token is not valid</Message.Header>
						</Message>
					)}
			</div>
		);
	}
}

export default connect(null, { confirm })(ConfirmationPage);
