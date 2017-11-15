import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class AddBookForm extends Component {
	state = {};

	render() {
		return (
			<Card centered>
				<Card.Content textAlign="center">
					<Card.Header>Add New Book</Card.Header>
					<Link to="/books/new">
						<Icon name="plus circle" size="massive" />
					</Link>
				</Card.Content>
			</Card>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddBookForm);
