import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';
import rootReducer from './reducers';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

if (localStorage.bookwormJWT) {
	const user = { token: localStorage.bookwormJWT };
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root'),
);
registerServiceWorker();
