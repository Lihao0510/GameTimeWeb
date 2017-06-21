/**
 * Created by lihao on 2017/5/31.
 */
import {
    FETCH_WIEXIN_SUCCESS, FETCH_WEIXIN_START, FETCH_WEIXIN_ERROR,
    ADD_WEIXIN_START, ADD_WEIXIN_SUCCESS, ADD_WEIXIN_ERROR
} from '../action/WeixinNewsAction';

export const fetchWeixinNewsReducer = (state = {news: [], status: FETCH_WEIXIN_START}, action) => {

    switch (action.type) {
        case FETCH_WEIXIN_START:
            return {
                ...state,
                status: FETCH_WEIXIN_START
            };
        case FETCH_WIEXIN_SUCCESS:
            return {
                ...state,
                status: FETCH_WIEXIN_SUCCESS,
                news: action.result
            };
        case FETCH_WEIXIN_ERROR:
            return {
                ...state,
                status: FETCH_WEIXIN_ERROR,
                error: action.error
            };
        default:
            return state;
    }

};

export const addWeixinNewsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_WEIXIN_START:
            return {
                status: ADD_WEIXIN_START
            };
        case ADD_WEIXIN_SUCCESS:
            return {
                status: ADD_WEIXIN_SUCCESS
            };
        case ADD_WEIXIN_ERROR:
            return {
                status: ADD_WEIXIN_ERROR
            };
        default:
            return state;
    }
};