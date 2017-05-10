/**
 * Created by lihao on 2017/5/10.
 */
import React, {Component} from 'react';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

import App from './App';
import Page from './Page';
import NewsPage from './page/NewsPage';
import ForumPage from './page/ForumPage';
import UserPage from './page/UserPage';
import SystemPage from './page/SystemPage';

class RootRoute extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/'} components={Page}>
                    <IndexRedirect to="/app/news/weixin" />
                    <Route path={'app'} component={App}>
                        <Route path={'news/weixin'} component={NewsPage}/>
                        <Route path={'news/local'} component={NewsPage}/>
                        <Route path={'news/picture'} component={NewsPage}/>
                        <Route path={'forum/lol'} component={ForumPage}/>
                        <Route path={'forum/dota'} component={ForumPage}/>
                        <Route path={'forum/stone'} component={ForumPage}/>
                        <Route path={'forum/nongyao'} component={ForumPage}/>
                        <Route path={'user/sys'} component={UserPage}/>
                        <Route path={'user/app'} component={UserPage}/>
                        <Route path={'user/authority'} component={UserPage}/>
                        <Route path={'system/crawler'} component={SystemPage}/>
                        <Route path={'system/plate'} component={SystemPage}/>
                        <Route path={'system/mail'} component={SystemPage}/>
                        <Route path={'system/setting'} component={SystemPage}/>
                    </Route>
                </Route>
            </Router>
        )
    }
}

export default RootRoute;