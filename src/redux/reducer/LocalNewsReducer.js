/**
 * Created by lihao on 2017/6/25.
 */
import {
    FETCH_LOCAL_ERROR,
    FETCH_LOCAL_START,
    FETCH_LOCAL_SUCCESS,
    ADD_LOCAL_ERROR,
    ADD_LOCAL_START,
    ADD_LOCAL_SUCCESS,
    DELETE_LOCAL_START,
    DELETE_LOCAL_SUCCESS,
    DELETE_LOCAL_ERROR
} from '../action/LocalNewsAction';

export const fetchLocalNewsReducer = (state = {news: [], status: FETCH_LOCAL_SUCCESS}, action) => {

    switch (action.type) {
        case FETCH_LOCAL_START:
            return {
                ...state,
                status: FETCH_LOCAL_START
            };
        case FETCH_LOCAL_SUCCESS:
            return {
                ...state,
                status: FETCH_LOCAL_SUCCESS,
                news: action.result
            };
        case FETCH_LOCAL_ERROR:
            return {
                ...state,
                status: FETCH_LOCAL_ERROR,
                error: action.error
            };
        default:
            return state;
    }

};

export const addLocalNewsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LOCAL_START:
            return {
                status: ADD_LOCAL_START
            };
        case ADD_LOCAL_SUCCESS:
            return {
                status: ADD_LOCAL_SUCCESS
            };
        case ADD_LOCAL_ERROR:
            return {
                status: ADD_LOCAL_ERROR
            };
        default:
            return state;
    }
};

export const deleteLocalNewsReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LOCAL_START:
            return {
                status: DELETE_LOCAL_START
            };
        case DELETE_LOCAL_SUCCESS:
            return {
                status: DELETE_LOCAL_SUCCESS
            };
        case DELETE_LOCAL_ERROR:
            return {
                status: DELETE_LOCAL_ERROR
            };
        default:
            return state;
    }
};