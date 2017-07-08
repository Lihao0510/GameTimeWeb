/**
 * Created by lihao on 2017/6/25.
 */
export const CLOSE_WINDOW = 'EDIT/CLOSE_WINDOW';
export const OPEN_WINDOW = 'EDIT/OPEN_WINDOW';

export const closeWindow = () => {
    return ({
        type: CLOSE_WINDOW
    })
};

export const openWindow = () => {
    return ({
        type: OPEN_WINDOW
    })
};