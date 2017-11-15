import api from '../api';

export const fetchBooks = query => () => api.book.fetch(query); // eslint-disable-line
