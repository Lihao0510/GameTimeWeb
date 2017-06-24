/**
 * Created by lihao on 2017/6/21.
 */
import Urls from '../../util/UrlList';

export const CLOSE_SYSUSER_DETAIL = 'DETAIL/CLOSE_SYS_DETAIL';
export const OPEN_SYSUSER_DETAIL = 'DETAIL/OPEN_SYS_DETAIL';
export const FETCH_START = 'DETAIL/FETCH_SYSAUTH_START';
export const FETCH_SUCCESS = 'DETAIL/FETCH_SYSAUTH_SUCCESS';
export const FETCH_ERROR = 'DETAIL/FETCH_SYSAUTH_ERROR';

//全局请求ID，记录最新请求的编号
let requestSysUserAuthID = 0;

export const closeWindow = () => {
    return ({
        type: CLOSE_SYSUSER_DETAIL
    })
};

export const openWindow = () => {
    return ({
        type: OPEN_SYSUSER_DETAIL
    })
};

export const fetchSysUserAuthMessage = (userID) => {

    //redux-thunk中间件只针对返回是函数的Action进行拦截
    return (dispatch) => {

        const requestUrl = Urls.baseUrl + 'users/getbyno/' + userID;

        //用一个局部常量记录本次请求的ID，若用户有新的登录操作，全局的请求ID会增加1
        const seqID = ++requestSysUserAuthID;

        //判断当前请求的结果是否有效，若ID与全局ID相符合才dispatch出去
        const dispatchValidSeqID = (action) => {
            if (seqID === requestSysUserAuthID) {
                dispatch(action);
            }
        };

        //先发出Loading的Action
        dispatchValidSeqID(fetchUserStart());

        //进行网络请求
        fetch(requestUrl, {method: 'GET'})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Failed to get Response from server: ' + response.status)
                }
                return response.json();
            })
            .then((result) => {
                if (result.status === 1) {
                    dispatchValidSeqID(fetchUserSuccess(result.user));
                } else {
                    dispatchValidSeqID(fetchUserError(new Error('Fail to get users!')));
                }
            })
            .catch((error) => {
                dispatchValidSeqID(fetchUserError(error))
            })
    }
};

export const fetchUserStart = () => {
    return {
        type: FETCH_START
    }
};

export const fetchUserSuccess = (result) => {
    return {
        type: FETCH_SUCCESS,
        result: result
    }
};

export const fetchUserError = (error) => {
    return {
        type: FETCH_ERROR,
        error: error
    }
};