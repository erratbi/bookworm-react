import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';

const App = ({ location }) => (
	<div className="ui container">
		<Route location={location} path="/" exact component={HomePage} />
		<GuestRoute location={location} path="/login" exact component={LoginPage} />
		<Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
		<GuestRoute location={location} path="/signup" exact component={SignupPage} />
		<GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
		<GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
		<UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
};

export default App;
