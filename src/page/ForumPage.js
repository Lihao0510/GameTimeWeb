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
import moment from 'moment';
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
    title: '帖子标题',
    dataIndex: 'post_title',
    key: 'post_title',
    render: text => <a href="#">{text}</a>,
}, {
    title: '发帖人',
    dataIndex: 'post_man',
    key: 'post_man',
}, {
    title: '帖子类型',
    dataIndex: 'post_type',
    key: 'post_type',
}, {
}, {
    title: '阅读数',
    dataIndex: 'post_reader',
    key: 'post_reader',
}, {
}, {
    title: '回帖数',
    dataIndex: 'post_replyed',
    key: 'post_replyed',
}, {
    title: '发帖时间',
    dataIndex: 'create_time',
    key: 'create_time',
}];



class ForumPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false,
            postData: []
        };
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
        this.getPostList = this.getPostList.bind(this);
        this.getPostList();
    }

    getPostList() {
        fetch(Urls.baseUrl + 'forum/getlatest',
            {
                method: 'GET',
                //credentials: 'include'
            })
            .then((result) => {
                return result.json();
            })
            .then((resultData) => {
                if (resultData.status === 1) {
                    let resultArr = resultData.posts.map((data, key) => {
                        return {
                            /*post_title: data.post_title,
                             post_man: data.post_man.user_phone,
                             post_type: data.post_type,
                             post_reader: data.post_reader,
                             post_replyed: data.post_replyed,
                             create_time: data.create_time,*/
                            //使用对象的分解
                            ...data,
                            post_man: data.post_man.user_phone,
                            create_time: moment(data.create_time).format('YYYY-MM-DD HH:mm')
                        }
                    });
                    this.setState({
                        postData: resultArr
                    });
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
                <Table columns={columns} dataSource={this.state.postData} className="NewsTable"/>
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

export default connect(mapStateToProps, mapFuncToProps)(ForumPage)