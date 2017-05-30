/**
 * Created by lihao on 2017/5/23.
 */
import {FETCH_START, FETCH_ERROR, FETCH_SUCCESS} from '../action/ManageSysUserAction';

const manageSysUserReducer = (state = {users: [], status: FETCH_START}, action) => {

    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                status: FETCH_START
            };
        case FETCH_SUCCESS:
            console.log('请求系统用户数据成功:' + action.result);
            return {
                ...state,
                status: FETCH_SUCCESS,
                users: action.result
            };
        case FETCH_ERROR:
            console.log('发生错误:' + action.error);
            return {
                ...state,
                status: FETCH_ERROR
            };
        default:
            return state;

    }

};

export default manageSysUserReducer;