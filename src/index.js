import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './stylesheet/index.css';
import {Provider} from 'react-redux';
import store from './redux/store';

import RootRoute from './RootRoute';

class GameTime extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootRoute />
            </Provider>
        )
    }
}

ReactDOM.render(
    <GameTime/>,
    document.getElementById('root')
);
