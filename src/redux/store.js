/**
 * Created by Lihao on 2017/5/7.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer'

const middleWares = [thunk];

export default createStore(reducers, {}, applyMiddleware(...middleWares));