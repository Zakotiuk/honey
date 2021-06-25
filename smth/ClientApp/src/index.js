import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import configureStore, {history} from './store/storeConfig';
//import { ConnectedRouter } from 'connected-react-router';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
    </Provider>,
  rootElement);
