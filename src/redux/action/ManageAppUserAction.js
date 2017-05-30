/**
 * Created by lihao on 2017/5/23.
 */
import Urls from '../../util/UrlList';
import moment from 'moment';

export const FETCH_START = 'APPUSER/FETCH_START';
export const FETCH_SUCCESS = 'APPUSER/FETCH_SUCCESS';
export const FETCH_ERROR = 'APPUSER/FETCH_ERROR';

export const fetchAllAppUser = () => {

    return (dispatch) => {
        const requestUrl = Urls.baseUrl + 'users/getall';

        dispatch(fetchUserStart());

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
                    dispatch(fetchUserSuccess(resultArr));
                }else{
                    dispatch(fetchUserError(new Error('Fail to get users!')));
                }
            })
            .catch((error) => {
                dispatch(fetchUserError(error))
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

