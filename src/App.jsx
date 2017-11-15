import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigationBar from './components/navigation/TopNavigationBar';
import AddNewBookPage from './components/pages/AddNewBookPage';

const App = ({ location, isAuthentiacted }) => (
	<div className="ui container">
		{isAuthentiacted && <TopNavigationBar />}
		<Route location={location} path="/" exact component={HomePage} />
		<GuestRoute location={location} path="/login" exact component={LoginPage} />
		<Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
		<GuestRoute location={location} path="/signup" exact component={SignupPage} />
		<GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />
		<GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />
		<UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
		<UserRoute location={location} path="/books/new" exact component={AddNewBookPage} />
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	isAuthentiacted: PropTypes.bool.isRequired,
};

export default connect(state => ({ isAuthentiacted: !!state.user.email }))(App);
