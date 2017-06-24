/**
 * Created by lihao on 2017/5/10.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

import App from './App';
import Page from './Page';
//import NewsPage from './page/NewsPage';
//import ForumPage from './page/ForumPage';
//import SysUserPage from './page/SysUserPage';
//import AppUserPage from './page/AppUserPage';
//import SystemPage from './page/SystemPage';

const getNewsPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/NewsPage').default)
    }, 'newspage');
};

const getForumPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/ForumPage').default)
    }, 'forumpage');
};

const getSysUserPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/SysUserPage').default)
    }, 'sysuserpage');
};

const getAppUserPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/AppUserPage').default)
    }, 'appuserpage');
};

const getSystemPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/SystemPage').default)
    }, 'systempage');
};

class RootRoute extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/app/news/weixin"/>
                    <Route path={'app'} component={App}>
                        <Route path={'news/weixin'} getComponent={getNewsPage}/>
                        <Route path={'news/local'} getComponent={getNewsPage}/>
                        <Route path={'news/picture'} getComponent={getNewsPage}/>
                        <Route path={'forum/lol'} getComponent={getForumPage}/>
                        <Route path={'forum/dota'} getComponent={getForumPage}/>
                        <Route path={'forum/stone'} getComponent={getForumPage}/>
                        <Route path={'forum/nongyao'} getComponent={getForumPage}/>
                        <Route path={'user/sys'} getComponent={getSysUserPage}/>
                        <Route path={'user/app'} getComponent={getAppUserPage}/>
                        <Route path={'user/authority'} getComponent={getAppUserPage}/>
                        <Route path={'system/crawler'} getComponent={getSystemPage}/>
                        <Route path={'system/plate'} getComponent={getSystemPage}/>
                        <Route path={'system/mail'} getComponent={getSystemPage}/>
                        <Route path={'system/setting'} getComponent={getSystemPage}/>
                    </Route>
                </Route>
            </Router>
        )
    }
}

export default RootRoute;