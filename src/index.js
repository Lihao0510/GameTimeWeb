import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './stylesheet/index.css';
import {Provider} from 'react-redux';
import store from './redux/store';

class GameTime extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDOM.render(
    <GameTime />,
    document.getElementById('root')
);
