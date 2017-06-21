/**
 * Created by lihao on 2017/5/10.
 */

import React, {Component} from 'react';
import '../stylesheet/NewsPage.css';
import {connect} from 'react-redux';
import {Layout, Table, Icon, Button, Modal, notification} from 'antd';
import NewsInput from '../component/NewsInput';
import {openWindow} from '../redux/action/InputWindowAction';
import {FETCH_START, FETCH_SUCCESS, FETCH_ERROR, fetchAllSysUser} from '../redux/action/ManageSysUserAction';
const {Column} = Table;

notification.config({
    placement: 'bottomRight',
});


class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false,
            newsData: [],
            selectedUser: {},
            selectedNum: 0,
            stopModalVisible: false
        };
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
    }

    componentDidMount() {
        this.props.fetchSysUser();
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys.length}`);
                if (selectedRowKeys.length == 1) {
                    this.setState({
                        selectedUser: selectedRows[0],
                        selectedNum: 1
                    })
                } else {
                    this.setState({
                        selectedUser: {},
                        selectedNum: selectedRowKeys.length
                    })
                }
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        return (
            <Layout className="NewsPageLayout" style={{background: '#fff', padding: 12, height: '100%'}}>
                <div className="NewsPageButtonContainer">
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={() => {
                            this.setState({
                                stopModalVisible: true,

                            })
                        }}
                        disabled={this.state.selectedNum === 0}
                    >
                        停用
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.props.openWindow}
                        disabled={this.state.selectedNum === 0}
                    >
                        启用
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.props.openWindow}
                        disabled={this.state.selectedNum !== 1}
                    >
                        查看
                    </Button>
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
                <Modal
                    title="新闻操作"
                    visible={this.state.modalVisible}
                    onOk={this.handleOK}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancle}
                >
                    <p>      {this.state.modalText}</p>
                </Modal>
                <Modal
                    title="停用系统用户"
                    visible={this.state.stopModalVisible}
                    onOk={this.handleOK}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancle}
                >
                    <p>      是否停用选中用户?</p>
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
        users: state.manageSysUserReducer.users,
        status: state.manageSysUserReducer.status,
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        fetchSysUser: () => {
            dispatch(fetchAllSysUser())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(UserPage)