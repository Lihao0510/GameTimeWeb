/**
 * Created by lihao on 2017/6/25.
 */
/**
 * Created by Lihao on 2017/5/9.
 */
import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form, Input, Select, notification} from 'antd';
import {connect} from 'react-redux';
import {closeWindow} from '../redux/action/EditWindowAction';
import {addLocalNews, fetchLocalNews, ADD_LOCAL_SUCCESS, ADD_LOCAL_START, ADD_LOCAL_ERROR} from '../redux/action/LocalNewsAction';
import Urls from '../util/UrlList';
const FormItem = Form.Item;

notification.config({
    placement: 'bottomRight',
});

class NewsInput extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.string,
    };

    static defaultProps = {};

    handleCreate = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({
                confirmLoading: false
            });
            console.log('接收到的数据:', values);

            this.props.createLocalNews(values);
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
        };
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(this.props.createStatus !== newProps.createStatus){
            console.log(newProps.createStatus);
            if(this.props.createStatus === ADD_LOCAL_START && newProps.createStatus === ADD_LOCAL_SUCCESS){
                console.log('创建成功!');
                this.props.updateLocalNews();
                this.props.closeWindow();
                notification['success']({
                    message: '创建成功',
                    description: '该条新闻已成功创建!',
                });
            }else if(this.props.createStatus === ADD_LOCAL_START && newProps.createStatus === ADD_LOCAL_ERROR){
                console.log('创建失败!');
                this.props.updateLocalNews();
                this.props.closeWindow();
                notification['success']({
                    message: '创建失败',
                    description: '新闻创建失败, 请重新输入!',
                });
            }
        }
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <Modal
                visible={this.props.showWindow}
                title={this.props.title}
                onOk={() => {
                    this.handleCreate()
                }}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => {
                    this.props.closeWindow()
                }}
            >
                <Form layout="horizontal">
                    <FormItem label="新闻标题">
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: '请输入新闻标题!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="新闻图片链接">
                        {getFieldDecorator('picurl', {
                            rules: [{required: true, message: '请输入图片URL!'}],
                        })(<Input />)}
                    </FormItem>
                    <FormItem label="新闻内容">
                        {getFieldDecorator('content', {
                            rules: [{required: true, message: '请输入新闻内容!'}],
                        })(<Input type="textarea" rows={4} />)}
                    </FormItem>
                    <FormItem label="新闻来源">
                        {getFieldDecorator('from')(<Input />)}
                    </FormItem>
                    <FormItem label="新闻类型">
                        {getFieldDecorator('type', {
                            rules: [{required: true, message: '请选择新闻类型!'}],
                        })(
                            <Select placeholder="选择新闻类型">
                                <Option value="1">LOL新闻</Option>
                                <Option value="2">Dota2新闻</Option>
                                <Option value="3">炉石传说新闻</Option>
                                <Option value="4">王者荣耀新闻</Option>
                                <Option value="5">其他手游</Option>
                                <Option value="6">其他网游</Option>
                                <Option value="7">未分类</Option>
                                <Option value="0">特殊新闻</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        showWindow: state.editWindowReducer.showWindow,
        createStatus: state.addLocalNewsReducer.status
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        closeWindow: () => {
            dispatch(closeWindow());
        },

        createLocalNews: (newsBody) => {
            dispatch(addLocalNews(newsBody));
        },

        updateLocalNews: () => {
            dispatch(fetchLocalNews())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(Form.create()(NewsInput));