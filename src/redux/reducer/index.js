/**
 * Created by Lihao on 2017/5/7.
 */
import {combineReducers} from 'redux';
import inputWindowReducer from './InputWindowReducer';
import manageAppUserReducer from './ManageAppUserReducer';
import manageSysUserReducer from './ManageSysUserReducer';
import {addWeixinNewsReducer, fetchWeixinNewsReducer} from './WeixinNewsReducer';

export default combineReducers({
    inputWindowReducer,
    manageAppUserReducer,
    manageSysUserReducer,
    addWeixinNewsReducer,
    fetchWeixinNewsReducer
});