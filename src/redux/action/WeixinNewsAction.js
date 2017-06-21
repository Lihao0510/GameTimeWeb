/**
 * 新闻操作Action生成类
 * Created by lihao on 2017/5/31.
 */
import Urls from '../../util/UrlList';
import moment from 'moment';

export const FETCH_WEIXIN_START = 'NEWS/FETCH_WEIXIN_START';
export const FETCH_WIEXIN_SUCCESS = 'NEWS/FETCH_WIEXIN_SUCCESS';
export const FETCH_WEIXIN_ERROR = 'NEWS/FETCH_WEIXIN_ERROR';


export const ADD_WEIXIN_START = 'NEWS/ADD_WEIXIN_START';
export const ADD_WEIXIN_SUCCESS = 'NEWS/ADD_WEIXIN_SUCCESS';
export const ADD_WEIXIN_ERROR = 'NEWS/ADD_WEIXIN_ERROR';

let globalGetWeixinSeqID = 0;
let globalAddWeixinSeqID = 0;

export const fetchWeixinNews = () => {
    return (dispatch) => {

        const requestUrl = Urls.baseUrl + 'news/weixin/getallnews';

        const localSeq = ++globalGetWeixinSeqID;

        const dispatchValidSeqID = (action) => {
            if (localSeq === globalGetWeixinSeqID) {
                dispatch(action)
            }
        };

        dispatchValidSeqID(fetchWeixinNewsStart());

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
                    dispatchValidSeqID(fetchWeixinNewsSuccess(resultArr));
                } else {
                    dispatchValidSeqID(fetchWeixinNewsError(new Error('Fail to get users!')));
                }
            })
            .catch((error) => {
                dispatchValidSeqID(fetchWeixinNewsError(error))
            })
    }
};

export const fetchWeixinNewsStart = () => {
    return {
        type: FETCH_WEIXIN_START
    }
};

export const fetchWeixinNewsSuccess = (result) => {
    return {
        type: FETCH_WIEXIN_SUCCESS,
        result: result
    }
};

export const fetchWeixinNewsError = (error) => {
    return {
        type: FETCH_WEIXIN_ERROR,
        error: error
    }
};

export const addWeixinNewsStart = () => {
    return {
        type: ADD_WEIXIN_START
    }
};

export const addWeixinNewsSuccess = (result) => {
    return {
        type: ADD_WEIXIN_SUCCESS,
        result: result
    }
};

export const addWeixinNewsError = (error) => {
    return {
        type: ADD_WEIXIN_ERROR,
        error: error
    }
};

