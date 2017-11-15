import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import { fetchBooks } from '../../actions/books';

class SearchBookForm extends Component {
	static propTypes = {
		fetchBooks: PropTypes.func.isRequired,
		onBookSelect: PropTypes.func.isRequired,
	};

	state = {
		query: '',
		loading: false,
		options: [
			{
				key: 1,
				value: 1,
				text: 'Book one',
			},
			{
				key: 2,
				value: 2,
				text: 'Book two',
			},
		],
		books: {},
	};

	onChange = (e, data) => {
		this.setState({ query: data.value });
		this.props.onBookSelect(this.state.books[data.value]);
	};

	onSearchChange = (e, data) => {
		clearTimeout(this.timer);
		this.setState({ query: e.target.value });
		this.timer = setTimeout(this.fetchOptions, 800);
	};

	fetchOptions = () => {
		if (this.state.query.length < 2) return;
		this.setState({ loading: true });
		this.props.fetchBooks(this.state.query).then(books => {
			const options = [];
			const booksHash = {};
			books.forEach(book => {
				booksHash[book.goodreadId] = book;
				options.push({ key: book.goodreadId, value: book.goodreadId, text: book.title });
			});
			this.setState({ loading: false, options, books: booksHash });
		});
	};

	render() {
		const { loading, options, query } = this.state;
		return (
			<Form>
				<Dropdown
					search
					fluid
					placeholder="Search for a book by title"
					loading={loading}
					value={query}
					onChange={this.onChange}
					onSearchChange={this.onSearchChange}
					options={options}
				/>
			</Form>
		);
	}
}

export default connect(null, { fetchBooks })(SearchBookForm);
