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
import {fetchWeixinNews} from '../redux/action/WeixinNewsAction';
import Urls from '../util/UrlList';

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

class NewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false
        };
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
        this.getNewsList = this.getNewsList.bind(this);
    }

    componentDidMount() {
        this.getNewsList();
    }

    getNewsList() {
        this.props.getWeixinNews();
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
                            marginRight: 15,
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
                <Table
                    rowSelection={rowSelection}
                    bordered
                    dataSource={this.props.weixinNews}
                    style={{height: '100%'}}
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
                        title="新闻标题"
                        dataIndex="news_title"
                        key="news_title"
                    />
                    <Column
                        title="新闻来源"
                        dataIndex="news_from"
                        key="news_from"
                        style={{
                            width: 100
                        }}
                    />
                    <Column
                        title="图片地址"
                        dataIndex="news_pic"
                        key="news_pic"
                        style={{
                            width: 100
                        }}
                        render={(text) => {
                            return (
                                <a href={text} target="view_window">点击查看图片</a>
                            )
                        }}
                    />
                    <Column
                        title="新闻地址"
                        dataIndex="news_url"
                        key="news_url"
                        style={{
                            width: 100
                        }}
                        render={(text) => {
                            return (
                                <a href={text} target="view_window">点击查看新闻</a>
                            )
                        }}
                    />
                    <Column
                        title="创建时间"
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
        fetchStatus: state.fetchWeixinNewsReducer.status,
        weixinNews: state.fetchWeixinNewsReducer.news
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        openWindow: () => {
            dispatch(openWindow())
        },

        getWeixinNews: () => {
            dispatch(fetchWeixinNews())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(NewsPage)