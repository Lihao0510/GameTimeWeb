/**
 * Created by lihao on 2017/6/25.
 */
import {CLOSE_WINDOW, OPEN_WINDOW, closeWindow} from '../action/EditWindowAction';

const editWindowReducer = (state = closeWindow(), action) => {

    switch (action.type) {
        case OPEN_WINDOW:
            return {
                ...state,
                showWindow: true
            };
        case CLOSE_WINDOW:
            return {
                ...state,
                showWindow: false
            };
        default:
            return {
                ...state
            };
    }
};



export default editWindowReducer;