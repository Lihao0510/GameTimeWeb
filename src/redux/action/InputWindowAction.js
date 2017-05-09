/**
 * Created by Lihao on 2017/5/9.
 */
export const CLOSE_WINDOW = 'CLOSE_WINDOW';
export const OPEN_WINDOW = 'OPEN_WINDOW';

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