/**
 * Created by Lihao on 2017/5/9.
 */
import {CLOSE_WINDOW, OPEN_WINDOW, closeWindow, openWindow} from '../action/InputWindowAction';

const inputWindowReducer = (state = closeWindow(), action) => {

    switch (action.type) {
        case OPEN_WINDOW:
            return {
                ...state,
                showWindow: true
            };
            break;
        case CLOSE_WINDOW:
            return {
                ...state,
                showWindow: false
            };
            break;
        default:
            return {
                ...state
            };
            break;
    }
};

export default inputWindowReducer;