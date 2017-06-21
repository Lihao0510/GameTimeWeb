/**
 * Created by lihao on 2017/5/23.
 */
import Urls from '../../util/UrlList';
import moment from 'moment';

export const FETCH_START = 'SYSUSER/FETCH_START';
export const FETCH_SUCCESS = 'SYSUSER/FETCH_SUCCESS';
export const FETCH_ERROR = 'SYSUSER/FETCH_ERROR';

//全局请求ID，记录最新请求的编号
let globalSeqID = 0;

export const fetchAllSysUser = () => {

    return (dispatch) => {

        const requestUrl = Urls.baseUrl + 'sys/users/getall';

        //用一个局部常量记录本次请求的ID，若用户有新的登录操作，全局的请求ID会增加1
        const seqID = ++globalSeqID;

        //判断当前请求的结果是否有效，若ID与全局ID相符合才dispatch出去
        const dispatchValidSeqID = (action) => {
            if (seqID === globalSeqID) {
                dispatch(action);
            }
        };

        dispatchValidSeqID(fetchUserStart());

        fetch(requestUrl, { method: 'GET'})
            .then((response) => {
                if(response.status !== 200){
                    throw new Error('Failed to get Response from server: ' + response.status)
                }
                return response.json();
            })
            .then((result) => {
                if (result.status === 1) {
                    let resultArr = result.users.map((data, key) => {
                        return {
                            ...data,
                            key: ++key,
                            create_time: moment(data.create_time).format('YYYY-MM-DD HH:mm')
                        }
                    });
                    dispatchValidSeqID(fetchUserSuccess(resultArr));
                }else{
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