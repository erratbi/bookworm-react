import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Form, Button, Segment, Grid, Image } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class BookForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
		book: PropTypes.shape({
			goodreadId: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			authors: PropTypes.string.isRequired,
			covers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			pages: PropTypes.number.isRequired,
		}).isRequired,
	};

	state = {
		data: {
			goodreadId: this.props.book.goodreadId,
			title: this.props.book.title,
			authors: this.props.book.authors,
			pages: this.props.book.pages,
		},
		index: 0,
		covers: this.props.book.covers,
		loading: false,
		errors: {},
	};

	componentWillReceiveProps(props) {
		this.setState({
			data: {
				goodreadId: props.book.goodreadId,
				title: props.book.title,
				authors: props.book.authors,
				pages: props.book.pages,
			},
			index: 0,
			covers: props.book.covers,
		});
	}

	onChange = e =>
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: e.target.value },
		});

	onChangeNumber = e =>
		this.setState({
			...this.state,
			data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) },
		});

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).lenght === 0) {
			this.setState({ loading: false });
			this.props
				.submit(this.state.data)
				.catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
		}
	};

	validate = data => {
		const errors = {};
		if (!data.title) errors.title = "Can't be blank";
		if (!data.authors) errors.authors = "Can't be blank";
		if (!data.pages) errors.pages = "Can't be blank";
		return errors;
	};

	render() {
		const { errors, data, loading, covers, index } = this.state;
		return (
			<Segment>
				<Form onSubmit={this.onSubmit}>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								<Form.Field error={!!errors.title}>
									<label htmlFor="title">Book Title</label>
									<input
										type="text"
										id="title"
										name="title"
										placeholder="Title"
										value={data.title}
										onChange={this.onChange}
									/>
									{errors.title && <InlineError text={errors.title} />}
								</Form.Field>
								<Form.Field error={!!errors.authors}>
									<label htmlFor="authors">Book authors</label>
									<input
										type="text"
										id="authors"
										name="authors"
										placeholder="Authors"
										value={data.authors}
										onChange={this.onChange}
									/>
									{errors.authors && <InlineError text={errors.authors} />}
								</Form.Field>
								<Form.Field error={!!errors.pages}>
									<label htmlFor="pages">Count pages</label>
									<input type="number" id="pages" name="pages" value={data.pages} onChange={this.onChangeNumber} />
									{errors.pages && <InlineError text={errors.pages} />}
								</Form.Field>
							</Grid.Column>
							<Grid.Column>
								<Image size="small" src={covers[index]} />
								{covers.length > 1 && (
									<Button onClick={() => this.setState({ index: (index + 1) % covers.length })}>Another cover</Button>
								)}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Button primary loading={loading}>
								Save
							</Button>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		);
	}
}

export default BookForm;
