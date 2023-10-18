import { store } from './config/store';
import { Provider } from 'react-redux';
import App from './app';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);