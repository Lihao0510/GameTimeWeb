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
import {openWindow} from '../redux/action/InputWindowAction'
notification.config({
    placement: 'bottomRight',
});

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider"/>
      <a href="#">Delete</a>
      <span className="ant-divider"/>
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down"/>
      </a>
    </span>
    ),
}];

const data = [{
    key: '1',
    name: '系统',
    age: 32,
    address: '欢迎来到系统页面',
}];

class SystemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false
        }
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
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
                <Table columns={columns} dataSource={data} className="NewsTable"/>
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

export default connect(mapStateToProps, mapFuncToProps)(SystemPage)