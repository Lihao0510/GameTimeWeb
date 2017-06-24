/**
 * Created by lihao on 2017/6/21.
 */
import {
    CLOSE_SYSUSER_DETAIL,
    OPEN_SYSUSER_DETAIL,
    FETCH_ERROR,
    FETCH_SUCCESS,
    FETCH_START,
    closeWindow,
    fetchUserStart
} from '../action/DetailPageAction';

export const detailWindowReducer = (state = closeWindow(), action) => {

    switch (action.type) {
        case OPEN_SYSUSER_DETAIL:
            return {
                ...state,
                showSysuserDetail: true
            };
        case CLOSE_SYSUSER_DETAIL:
            return {
                ...state,
                showSysuserDetail: false
            };
        default:
            return {
                ...state
            };
    }
};

export const fetchSysUserDetailReducer = (state = fetchUserStart(), action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                status: FETCH_START
            };
        case FETCH_ERROR:
            return {
                ...state,
                status: FETCH_ERROR,
                error: action.error
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                status: FETCH_SUCCESS,
                userDetail: action.result
            };
        default:
            return {
                ...state
            };
    }
};