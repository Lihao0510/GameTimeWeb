/**
 * Created by lihao on 2017/5/10.
 */
/**
 * Created by lihao on 2017/5/10.
 */
/**
 * Created by Lihao on 2017/5/8.
 */
import React, {Component} from 'react';
import '../stylesheet/NewsPage.css';
import {connect} from 'react-redux';
import {Layout, Table, Icon, Button, Modal, notification} from 'antd';
import NewsInput from '../component/NewsInput';
import {openWindow} from '../redux/action/InputWindowAction';
import Urls from '../util/UrlList';

notification.config({
    placement: 'bottomRight',
});

const columns = [{
    title: '用户ID',
    dataIndex: 'user_id',
    key: 'user_id',
}, {
    title: '用户手机',
    dataIndex: 'user_phone',
    key: 'user_phone',
}, {
    title: '用户等级',
    dataIndex: 'user_type',
    key: 'user_type',
}, {
    title: '上次登陆时间',
    dataIndex: 'login_time',
    key: 'login_time',
}, {
    title: '注册时间',
    dataIndex: 'create_time',
    key: 'create_time',
}];

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false,
            newsData: []
        };
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.getUserList();
    }

    getUserList() {
        fetch(Urls.baseUrl + 'users/getall',
            {
                method: 'GET',
                //credentials: 'include'
            })
            .then((result) => {
                return result.json();
            })
            .then((resultData) => {
                console.log(resultData);
                if (resultData.status === 1) {
                    this.setState({
                        newsData: resultData.users
                    });
                    console.log(resultData.users)
                }
            })
            .catch((error) => {
                console.log('error:' + error.toString());
            });
    }

    openAlert() {
        this.setState({
            modalText: '是否删除该新闻?',
            modalVisible: true,
        });
    }

    handleOK() {
        this.setState({
            modalText: '正在删除中',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                modalVisible: false,
                confirmLoading: false,
            });
            notification['success']({
                message: '删除成功',
                description: '该条新闻已成功从数据库删除!',
            });
        }, 2000);
    }

    handleCancle() {
        this.setState({
            modalVisible: false,
        });
    }

    render() {
        return (
            <Layout className="NewsPageLayout" style={{background: '#fff', padding: 12, height: '100%'}}>
                <div className="NewsPageButtonContainer">
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.props.openWindow}
                    >
                        新建
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.openAlert}
                    >
                        删除
                    </Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.props.openWindow}>详情</Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.props.openWindow}>修改</Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.openAlert}>撤销</Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.openAlert}>发布</Button>
                </div>
                <Table columns={columns} dataSource={this.state.newsData} className="NewsTable"/>
                <Modal title="新闻操作"
                       visible={this.state.modalVisible}
                       onOk={this.handleOK}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleCancle}
                >
                    <p>      {this.state.modalText}</p>
                </Modal>
                <NewsInput
                    visible={this.state.modalVisible}
                    title="新建新闻"
                />
            </Layout>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        openWindow: () => {
            dispatch(openWindow())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(UserPage)