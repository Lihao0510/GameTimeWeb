/**
 * Created by lihao on 2017/5/31.
 */
import Urls from '../../util/UrlList';
import moment from 'moment';

export const FETCH_LOCAL_START = 'NEWS/FETCH_LOCAL_START';
export const FETCH_LOCAL_SUCCESS = 'NEWS/FETCH_LOCAL_START';
export const FETCH_LOCAL_ERROR = 'NEWS/FETCH_LOCAL_START';

export const ADD_LOCAL_START = 'NEWS/ADD_WEIXIN_START';
export const ADD_LOCAL_SUCCESS = 'NEWS/ADD_WEIXIN_SUCCESS';
export const ADD_LOCAL_ERROR = 'NEWS/ADD_WEIXIN_ERROR';

let globalAddLocalSeqID = 0;
let globalGetLocalSeqID = 0;

export const fetchLocalNews = () => {

    return (dispatch) => {

        const requestUrl = Urls.baseUrl + 'news/local/getallnews';

        const localSeq = ++globalGetLocalSeqID;

        const dispatchValidSeqID = (action) => {
            if (localSeq === globalGetLocalSeqID) {
                dispatch(action)
            }
        };

        dispatchValidSeqID(fetchLocalNewsStart());

        fetch(requestUrl, {method: 'GET'})
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Failed to get Response from server: ' + response.status)
                }
                return response.json();
            })
            .then((result) => {
                if (result.status === 1) {
                    let resultArr = result.news.map((data, key) => {
                        return {
                            ...data,
                            key: ++key,
                            create_time: moment(data.create_time).format('YYYY-MM-DD HH:mm')
                        }
                    });
                    dispatchValidSeqID(fetchLocalNewsSuccess(resultArr));
                } else {
                    dispatchValidSeqID(fetchLocalNewsError(new Error('Fail to get users!')));
                }
            })
            .catch((error) => {
                dispatchValidSeqID(fetchLocalNewsError(error))
            })
    }
};

export const addLocalNews = (newsBody) => {

    const requestUrl = Urls.baseUrl + 'news/local/create';

    const localSeq = ++globalAddLocalSeqID;

    const dispatchValidSeqID = (action) => {
        if (localSeq === globalAddLocalSeqID) {
            dispatch(action)
        }
    };

    dispatchValidSeqID(addLocalNewsStart());

    fetch(requestUrl,
        {
            method: 'POST',
            //credentials: 'include',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(newsBody)
        })
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to get Response from server: ' + response.status)
            }
            return response.json();
        })
        .then((result) => {
            if (result.status === 1) {
                let resultArr = result.news.map((data, key) => {
                    return {
                        ...data,
                        key: ++key,
                        create_time: moment(data.create_time).format('YYYY-MM-DD HH:mm')
                    }
                });
                dispatchValidSeqID(addLocalNewsSuccess(resultArr));
            } else {
                dispatchValidSeqID(addLocalNewsError(new Error('Fail to get users!')));
            }
        })
        .catch((error) => {
            dispatchValidSeqID(addLocalNewsError(error));
        })
};

export const fetchLocalNewsStart = () => {
    return {
        type: FETCH_LOCAL_START
    }
};

export const fetchLocalNewsSuccess = (result) => {
    return {
        type: FETCH_LOCAL_SUCCESS,
        result: result
    }
};

export const fetchLocalNewsError = (error) => {
    return {
        type: FETCH_LOCAL_ERROR,
        error: error
    }
};

export const addLocalNewsStart = () => {
    return {
        type: ADD_LOCAL_START
    }
};

export const addLocalNewsSuccess = (result) => {
    return {
        type: ADD_LOCAL_SUCCESS,
        result: result
    }
};

export const addLocalNewsError = (error) => {
    return {
        type: ADD_LOCAL_ERROR,
        error: error
    }
};