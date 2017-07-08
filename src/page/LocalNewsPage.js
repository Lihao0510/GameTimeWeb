/**
 * Created by lihao on 2017/6/25.
 */
/**
 * Created by Lihao on 2017/5/8.
 */
import React, {Component} from 'react';
import moment from 'moment';
import '../stylesheet/NewsPage.css';
import {connect} from 'react-redux';
import {Layout, Table, Icon, Button, Modal, notification} from 'antd';
import NewsEdit from '../component/NewsEdit';
import {openWindow} from '../redux/action/EditWindowAction';
import {
    fetchLocalNews,
    deleteLocalNews,
    DELETE_LOCAL_START,
    DELETE_LOCAL_SUCCESS,
    DELETE_LOCAL_ERROR
} from '../redux/action/LocalNewsAction';

const {Column} = Table;
notification.config({
    placement: 'bottomRight',
});


class NewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalText: 'Content of the modal dialog',
            modalVisible: false,
            confirmLoading: false,
            selectedNews: {},
            selectedNum: 0,
            selectedRowKeys: [],
            deleteNewsLine: ''
        };
        this.openAlert = this.openAlert.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.deleteNews = this.deleteNews.bind(this);
        this.handleCancle = this.handleCancle.bind(this);
    }

    componentDidMount() {
        this.props.getAllLocalNews();
    }

    openAlert() {
        this.setState({
            modalText: '是否删除该新闻?',
            modalVisible: true,
        });
    }

    deleteNews() {

        let newsIDLine = '';
        let newsTitleLine = '';
        let deleteNum = this.state.selectedRowKeys.length;
        for (let i = 0; i < deleteNum; i++) {
            let newsPosition = this.state.selectedRowKeys[i];
            if (newsPosition === 0) {
                continue;
            }
            let selectedNewsBody = this.props.localNews[--newsPosition];
            newsIDLine += selectedNewsBody._id + ',';
            newsTitleLine += selectedNewsBody.news_title + ',';
        }
        newsIDLine = newsIDLine.substring(0, newsIDLine.length - 1);
        newsTitleLine = newsTitleLine.substring(0, newsTitleLine.length - 1);
        console.log('即将被删除的新闻:' + newsTitleLine);

        this.setState({
            modalText: '是否删除以下新闻: ' + newsTitleLine,
            modalVisible: true,
            deleteNewsLine: newsIDLine
        });


    }

    handleOK() {
        this.setState({
            modalText: '正在删除中',
            confirmLoading: true,
        });
        this.props.deleteLocalNewsByIDs(this.state.deleteNewsLine);
    }

    handleCancle() {
        this.setState({
            modalVisible: false,
        });
    }

    componentWillReceiveProps(newProps) {
        if (this.props.deleteStatus !== newProps.deleteStatus) {
            if (this.props.deleteStatus === DELETE_LOCAL_START && newProps.deleteStatus === DELETE_LOCAL_SUCCESS) {
                console.log('删除成功!');
                this.setState({
                    modalVisible: false,
                });
                notification['success']({
                    message: '删除成功',
                    description: '该条新闻已成功从数据库删除!',
                });
                this.props.getAllLocalNews();
            } else if (this.props.deleteStatus === DELETE_LOCAL_START && newProps.deleteStatus === DELETE_LOCAL_ERROR) {
                console.log('删除失败!');
                this.setState({
                    modalVisible: false,
                });
                notification['error']({
                    message: '删除失败',
                    description: '因为不可知原因,删除失败!',
                });
                this.props.getAllLocalNews();
            }
        }
    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                for (let i = 0; i < selectedRowKeys.length; i++) {
                    if (selectedRowKeys[i] === 0) {
                        selectedRowKeys.remove(i);
                    }
                }
                if (selectedRowKeys.length == 1) {
                    this.setState({
                        selectedRowKeys,
                        selectedNews: selectedRows[0],
                        selectedNum: 1,
                        newsVisibleStatus: selectedRows[0].news_visible
                    })
                } else if (selectedRowKeys.length == 0) {
                    this.setState({
                        selectedRowKeys,
                        selectedNews: {},
                        selectedNum: selectedRowKeys.length,
                        newsVisibleStatus: 0
                    })
                } else {
                    this.setState({
                        selectedRowKeys,
                        selectedNews: {},
                        selectedNum: selectedRowKeys.length,
                        newsVisibleStatus: 0
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
                            marginRight: 15,
                        }}
                        onClick={this.props.openWindow}
                    >
                        新建
                    </Button>
                    <Button
                        type="danger"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.deleteNews}
                        disabled={this.state.selectedNum === 0}
                    >
                        删除
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.props.openWindow}
                        disabled={this.state.selectedNum !== 1}
                    >
                        预览
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.openAlert}
                        disabled={this.state.selectedNum !== 1}
                    >
                        撤回
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            marginRight: 15
                        }}
                        onClick={this.openAlert}
                        disabled={this.state.selectedNum !== 1}
                    >
                        发布
                    </Button>
                </div>
                <Table
                    rowSelection={rowSelection}
                    bordered
                    className="news-table"
                    dataSource={this.props.localNews}
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
                        title="发布状态"
                        dataIndex="news_visible"
                        key="news_visible"
                        style={{
                            width: 50
                        }}
                        render={(text) => {
                            return (
                                <span>{text === 1 ? '发布中' : '未发布'}</span>
                            )
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
                <NewsEdit
                    visible={this.state.modalVisible}
                    title="创建新闻"
                />
            </Layout>
        )
    }
}

const
    mapStateToProps = (state, ownProps) => {
        return {
            fetchStatus: state.fetchLocalNewsReducer.status,
            localNews: state.fetchLocalNewsReducer.news,
            deleteStatus: state.deleteLocalNewsReducer.status
        };
    };

const
    mapFuncToProps = (dispatch, ownProps) => {
        return {
            openWindow: () => {
                dispatch(openWindow());
            },

            getAllLocalNews: () => {
                dispatch(fetchLocalNews());
            },

            deleteLocalNewsByIDs: (newsIDArr) => {
                dispatch(deleteLocalNews(newsIDArr));
            }
        };
    };

export
default

connect(mapStateToProps, mapFuncToProps)

(
    NewsPage
)