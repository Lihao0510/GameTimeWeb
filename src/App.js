import React, {Component} from 'react';
import './stylesheet/App.css';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import {connect} from 'react-redux';
const {SubMenu} = Menu;
import {Link} from 'react-router';
const {Header, Content, Sider} = Layout;
const ButtonGroup = Button.Group;
import manageIcon from './image/icon_manage.png';
import Urls from './util/UrlList'

class App extends Component {

    constructor(props) {
        super(props);
        let userphone = window.usermessage;
        this.state = {
            userphone: userphone || '17786123214'
        }
        this.getUserMessage(this.state.userphone);
    }

    getUserMessage(userphone) {
        fetch(Urls.baseUrl + 'sys/users/getbyphone/' + userphone,
            {
                method: 'GET',
                //credentials: 'include'
            })
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                if (data.status === 1) {
                    //获取data.user
                    console.log(data.user)
                }
            })
            .catch((error) => {
                console.log('error:' + error.toString());
            });
    }

    doLogout() {
        fetch(Urls.baseUrl + 'sys/login/logout', {method: 'GET', credentials: 'include'})
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                if (data.status === 1) {
                    window.location.href = '/';
                }
            })
            .catch((error) => {
                console.log('error:' + error.toString());
            });
    }


    render() {
        return (
            <div className="App">
                <Layout className="Content">
                    <Header
                        className="Header"
                    >
                        <img src={manageIcon} alt="GameTime后台管理" className="header-icon"/>
                        <h2><font color="white">GameTime后台管理</font></h2>
                        <div className="header-spacer"></div>
                        <h4><font color="white">欢迎您 {this.state.userphone}</font></h4>
                        <ButtonGroup
                            style={
                                {
                                    marginLeft: 20
                                }
                            }
                        >
                            <Button type="default" icon="user" onClick={() => {
                            }}><b> 我的信息</b></Button>
                            <Button type="default" icon="poweroff" onClick={this.doLogout}><b> 退出系统</b></Button>
                        </ButtonGroup>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['weixin']}
                                defaultOpenKeys={['news']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="news" title={<span><Icon type="laptop"/><b>新闻管理</b></span>}>
                                    <Menu.Item key="weixin"><Link to={'/app/news/weixin'}>微信新闻</Link></Menu.Item>
                                    <Menu.Item key="local"><Link to={'/app/news/local'}>本地新闻</Link></Menu.Item>
                                    <Menu.Item key="picture"><Link to={'/app/news/picture'}>图片管理</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="forum" title={<span><Icon type="appstore-o"/><b>论坛管理</b></span>}>
                                    <Menu.Item key="lol"><Link to={'/app/forum/lol'}>LOL板块</Link></Menu.Item>
                                    <Menu.Item key="dota"><Link to={'/app/forum/dota'}>Dota板块</Link></Menu.Item>
                                    <Menu.Item key="stone"><Link to={'/app/forum/stone'}>炉石板块</Link></Menu.Item>
                                    <Menu.Item key="nongyao"><Link to={'/app/forum/nongyao'}>王者荣耀板块</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="user" title={<span><Icon type="user"/><b>用户管理</b></span>}>
                                    <Menu.Item key="sys"><Link to={'/app/user/sys'}>系统用户</Link></Menu.Item>
                                    <Menu.Item key="app"><Link to={'/app/user/app'}>App用户</Link></Menu.Item>
                                    <Menu.Item key="authority"><Link to={'/app/user/authority'}>权限设置</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="system" title={<span><Icon type="setting"/><b>系统管理</b></span>}>
                                    <Menu.Item key="crawler"><Link to={'/app/system/crawler'}>爬虫管理</Link></Menu.Item>
                                    <Menu.Item key="mail"><Link to={'/app/system/mail'}>邮件管理</Link></Menu.Item>
                                    <Menu.Item key="plate"><Link to={'/app/system/plate'}>板块管理</Link></Menu.Item>
                                    <Menu.Item key="setting"><Link to={'/app/system/setting'}>系统设置</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 12px 12px', minWidth: 750}}>
                            <Breadcrumb style={{margin: '12px 0'}}>
                                <Breadcrumb.Item>论坛管理</Breadcrumb.Item>
                                <Breadcrumb.Item>LOL论坛</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{background: '#fff', margin: 0, minHeight: 700}}>
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapFuncToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapFuncToProps)(App);
