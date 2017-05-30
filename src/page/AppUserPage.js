/**
 * Created by lihao on 2017/5/24.
 */

import React, {Component} from 'react';
import '../stylesheet/NewsPage.css';
import {connect} from 'react-redux';
import {Layout, Table, Icon, Button, Modal, notification} from 'antd';
import NewsInput from '../component/NewsInput';
import {openWindow} from '../redux/action/InputWindowAction';
import {FETCH_START, FETCH_SUCCESS, FETCH_ERROR, fetchAllAppUser} from '../redux/action/ManageAppUserAction';
const {Column} = Table;

notification.config({
    placement: 'bottomRight',
});

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
};

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
    }

    componentDidMount() {
        this.props.fetchAppUser();
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
        console.log(this.props.users);
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
                        封禁
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.openAlert}
                    >
                        清除
                    </Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.props.openWindow}>任命</Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.props.openWindow}>修改</Button>
                    <Button type="primary" style={{
                        marginRight: 15
                    }} onClick={this.openAlert}>批量发送邮件</Button>
                </div>
                <Table
                    dataSource={this.props.users}
                    className="NewsTable"
                    bordered
                    rowSelection={rowSelection}
                >
                    <Column
                        title="编号"
                        dataIndex="key"
                        key="key"
                        style={{
                            width: 50
                        }}
                        className="td-num"
                    />
                    <Column
                        title="用户ID"
                        dataIndex="user_id"
                        key="user_id"
                    />
                    <Column
                        title="用户手机"
                        dataIndex="user_phone"
                        key="user_phone"
                        style={{
                            width: 100
                        }}
                    />
                    <Column
                        title="用户等级"
                        dataIndex="user_type"
                        key="user_type"
                        style={{
                            width: 50
                        }}
                    />
                    <Column
                        title="用户邮箱"
                        dataIndex="user_email"
                        key="user_email"
                        style={{
                            width: 120
                        }}
                    />
                    <Column
                        title="注册时间"
                        dataIndex="create_time"
                        key="create_time"
                        style={{
                            width: 120
                        }}
                    />
                </Table>
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
    return {
        users: state.manageAppUserReducer.users,
        status: state.manageAppUserReducer.status,
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        fetchAppUser: () => {
            dispatch(fetchAllAppUser())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(UserPage)