/**
 * Created by Lihao on 2017/5/7.
 */
import {combineReducers} from 'redux';
import inputWindowReducer from './InputWindowReducer';
import editWindowReducer from './EditWindowReducer';
import manageAppUserReducer from './ManageAppUserReducer';
import manageSysUserReducer from './ManageSysUserReducer';
import {detailWindowReducer, fetchSysUserDetailReducer} from './DetailPageReducer';
import {addWeixinNewsReducer, fetchWeixinNewsReducer} from './WeixinNewsReducer';
import {addLocalNewsReducer, fetchLocalNewsReducer, deleteLocalNewsReducer} from './LocalNewsReducer';

export default combineReducers({
    inputWindowReducer,
    manageAppUserReducer,
    manageSysUserReducer,
    addWeixinNewsReducer,
    fetchWeixinNewsReducer,
    detailWindowReducer,
    fetchSysUserDetailReducer,
    editWindowReducer,
    addLocalNewsReducer,
    fetchLocalNewsReducer,
    deleteLocalNewsReducer
});