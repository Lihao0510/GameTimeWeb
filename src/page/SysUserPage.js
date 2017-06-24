/**
 * Created by lihao on 2017/5/10.
 */

import React, {Component} from 'react';
import '../stylesheet/NewsPage.css';
import {connect} from 'react-redux';
import {Layout, Table, Icon, Button, Modal, notification} from 'antd';
import UserDetail from '../component/UserDetail';
import {fetchAllSysUser, changeSysUserLevel} from '../redux/action/ManageSysUserAction';
import {openWindow, fetchSysUserAuthMessage} from '../redux/action/DetailPageAction';
const {Column} = Table;

const STOP_USER = 'stop_user';
const START_USER = 'start_user';
const REVIEW_USER = 'review_user';
const DELETE_USER = 'delete_user';

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
            modalType: STOP_USER
        };
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
        this.onTopButtonGroupClick = this.onTopButtonGroupClick.bind(this);
    }

    onTopButtonGroupClick(buttonType) {
        console.log('点击的按钮类型:' + buttonType);
        switch (buttonType) {
            case STOP_USER:
                this.setState({
                    modalVisible: true,
                    modalText: '确定要停用选中用户吗?',
                    modalType: buttonType
                });
                break;
            case START_USER:
                this.setState({
                    modalVisible: true,
                    modalText: '确定要启用选中用户吗?',
                    modalType: buttonType
                });
                break;
            case REVIEW_USER:
                this.setState({
                    modalVisible: true,
                    modalText: '确定要停用选中用户吗?',
                    modalType: buttonType
                });
                break;
            case DELETE_USER:
                this.setState({
                    modalVisible: true,
                    modalText: '确定要删除选中用户吗?',
                    modalType: buttonType
                });
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.props.fetchSysUser();
    }


    handleOK() {
        let curAction = this.state.modalType;

        switch (curAction) {
            case STOP_USER:
                let stopUserID = this.state.selectedUser.user_id;
                this.props.closeOrOpenSysUser(stopUserID, -1);
                break;
            case START_USER:
                let openUserID = this.state.selectedUser.user_id;
                this.props.closeOrOpenSysUser(openUserID, 0);
                break;
            case DELETE_USER:

                break;
            default:
                break;
        }

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
                        onClick={
                            () => {
                                this.onTopButtonGroupClick(STOP_USER)
                            }
                        }
                        disabled={this.state.selectedNum !== 1 && this.state.selectedUser.user_type !== -1}
                    >
                        停用
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={() => {
                            this.onTopButtonGroupClick(START_USER)
                        }
                        }
                        disabled={this.state.selectedNum !== 1}
                    >
                        启用
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={
                            () => {
                                this.props.reviewUserDetail();
                                this.props.getUserDetailByID(this.state.selectedUser.user_id)
                            }
                        }
                        disabled={this.state.selectedNum !== 1}
                    >
                        查看
                    </Button>
                    <Button
                        type="danger"
                        style={{
                            marginRight: 15
                        }}
                        onClick={
                            () => {
                                this.onTopButtonGroupClick(DELETE_USER)
                            }
                        }
                        disabled={this.state.selectedNum === 0}
                    >
                        删除
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
                        className="td-num"
                        title="用户ID"
                        dataIndex="user_id"
                        key="user_id"
                    />
                    <Column
                        className="td-num"
                        title="用户手机"
                        dataIndex="user_phone"
                        key="user_phone"
                        style={{
                            width: 100
                        }}
                    />
                    <Column
                        className="td-num"
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
                    title="系统用户操作"
                    visible={this.state.modalVisible}
                    onOk={this.handleOK}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancle}
                >
                    <p>{this.state.modalText}</p>
                </Modal>
                <UserDetail
                    title="系统管理员详情"
                    userID={this.state.selectedNum === 1 ? this.state.selectedUser.user_id + '' : ''}
                    userType="SYSTEM"
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
        },

        reviewUserDetail: () => {
            dispatch(openWindow())
        },

        getUserDetailByID: (userID) => {
            dispatch(fetchSysUserAuthMessage(userID))
        },

        closeOrOpenSysUser: (userID, userLevel) => {
            dispatch(changeSysUserLevel(userID, userLevel))
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(UserPage)