import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allBooksSelector } from '../../reducers/books';
import AddBookForm from '../forms/AddBookForm';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPage = ({ isConfirmed, books }) => (
	<div>
		{!isConfirmed && <ConfirmEmailMessage />}
		{books.length === 0 && <AddBookForm />}
	</div>
);

DashboardPage.propTypes = {
	isConfirmed: PropTypes.bool.isRequired,
	books: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
		}).isRequired,
	).isRequired,
};

function mapStateToProps(state) {
	return { isConfirmed: !!state.user.confirmed, books: allBooksSelector(state) };
}

export default connect(mapStateToProps)(DashboardPage);
