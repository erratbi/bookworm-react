import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

const TopNavigationBar = ({ user, logout }) => (
	<Menu secondary pointing>
		<Menu.Item as={Link} to="/dashboard">
			Dashboard
		</Menu.Item>
		<Menu.Item position="right">
			<Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
				<Dropdown.Menu>
					<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	</Menu>
);

TopNavigationBar.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
	}).isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	user: state.user,
});

const mapDispatchToProps = {
	logout: actions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigationBar);
