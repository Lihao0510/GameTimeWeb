/**
 * 用户详情的对话框,用Modal实现
 * Created by lihao on 2017/6/21.
 */
import React, {Component, PropTypes} from 'react';
import { Modal } from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import {FETCH_START, FETCH_SUCCESS, FETCH_ERROR, closeWindow} from '../redux/action/DetailPageAction'

class UserDetail extends Component{

    static propTypes = {
        title: PropTypes.string,
        userID: PropTypes.string,
        userType: PropTypes.string
    };

    static defaultProps = {
        title: '用户详情'
    };

    constructor(props){
        super(props);
        this.state = {
            confirmLoading: false
        }
    }

    componentDidMount() {
        console.log('对话框已完全展开!')
    }

    render(){
        return(
            <Modal
                visible={this.props.showWindow}
                title={this.props.title}
                onOk={() => {
                    this.props.closeWindow();
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => {
                    this.props.closeWindow();
                }}
            >
                <p>Hahahaha!!!{this.props.userID}</p>
                <p>{this.props.fetchStatus === FETCH_SUCCESS? '获取完成': '获取失败'}</p>
                <p>{this.props.fetchStatus === FETCH_SUCCESS? this.props.userDetail.user_phone: '无'}</p>
                <p>{this.props.fetchStatus === FETCH_SUCCESS? this.props.userDetail.user_id: '无'}</p>
                <p>{this.props.fetchStatus === FETCH_SUCCESS? this.props.userDetail.user_email: '无'}</p>
                <p>{this.props.fetchStatus === FETCH_SUCCESS? 'create_time:' + moment(this.props.userDetail.create_time).format('YYYY-MM-DD HH:mm'): '无'}</p>
            </Modal>
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        showWindow: state.detailWindowReducer.showSysuserDetail,
        userDetail: state.fetchSysUserDetailReducer.userDetail,
        fetchStatus: state.fetchSysUserDetailReducer.status,
        fetchError: state.fetchSysUserDetailReducer.error,
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        closeWindow: () => {
            dispatch(closeWindow())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(UserDetail);