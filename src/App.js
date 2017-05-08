import React, {Component} from 'react';
import './stylesheet/App.css';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import {connect} from 'react-redux';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const ButtonGroup = Button.Group;
import manageIcon from './image/icon_manage.png';
import Urls from './util/UrlList'
import NewsPage from './page/NewsPage';

class App extends Component {

    constructor(props) {
        super(props);
        let userphone = window.usermessage;
        this.state = {
            userphone: userphone
        }
        this.getUserMessage(userphone);
    }

    getUserMessage(userphone) {
        fetch(Urls.baseUrl + 'sys/users/getbyphone/' + userphone, {method: 'GET', credentials: 'include'})
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
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="laptop"/><b>新闻管理</b></span>}>
                                    <Menu.Item key="1">微信新闻</Menu.Item>
                                    <Menu.Item key="2">本地新闻</Menu.Item>
                                    <Menu.Item key="3">图片管理</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="appstore-o"/><b>论坛管理</b></span>}>
                                    <Menu.Item key="5">LOL板块</Menu.Item>
                                    <Menu.Item key="6">Dota板块</Menu.Item>
                                    <Menu.Item key="7">炉石板块</Menu.Item>
                                    <Menu.Item key="8">王者荣耀板块</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="user"/><b>用户管理</b></span>}>
                                    <Menu.Item key="9">系统用户</Menu.Item>
                                    <Menu.Item key="10">App用户</Menu.Item>
                                    <Menu.Item key="11">权限设置</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub4" title={<span><Icon type="setting"/><b>系统管理</b></span>}>
                                    <Menu.Item key="12">爬虫管理</Menu.Item>
                                    <Menu.Item key="13">邮件管理</Menu.Item>
                                    <Menu.Item key="14">板块管理</Menu.Item>
                                    <Menu.Item key="15">系统设置</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 12px 12px', minWidth: 1080}}>
                            <Breadcrumb style={{margin: '12px 0'}}>
                                <Breadcrumb.Item>论坛管理</Breadcrumb.Item>
                                <Breadcrumb.Item>LOL论坛</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{background: '#fff', margin: 0, minHeight: 280}}>
                                <NewsPage/>
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
