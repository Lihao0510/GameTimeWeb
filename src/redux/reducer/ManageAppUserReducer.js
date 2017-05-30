/**
 * Created by lihao on 2017/5/23.
 */
import {FETCH_START, FETCH_ERROR, FETCH_SUCCESS} from '../action/ManageAppUserAction';

const manageAppUserReducer = (state = {users: [], status: FETCH_START}, action) => {

    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                status: FETCH_START
            };
        case FETCH_SUCCESS:
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

export default manageAppUserReducer;