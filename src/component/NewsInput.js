/**
 * Created by Lihao on 2017/5/9.
 */
import React, {Component, PropTypes} from 'react';
import {Button, Modal, Form, Input, Select, notification} from 'antd';
import {connect} from 'react-redux';
import {closeWindow} from '../redux/action/InputWindowAction';
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

            fetch(Urls.baseUrl + 'news/weixin/create',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                    body: JSON.stringify(values)
                })
                .then((result) => {
                    return result.json();
                })
                .then((data) => {
                    if (data.status === 1) {
                        this.setState({
                            confirmLoading: false
                        });
                        console.log(data);
                        form.resetFields();
                        notification['success']({
                            message: '创建成功',
                            description: '新闻成功创建!',
                        });
                        this.props.closeWindow();
                    } else {
                        this.setState({
                            confirmLoading: false
                        });
                        notification['error']({
                            message: '创建失败',
                            description: '该新闻标题重复!',
                        });
                    }
                })
                .catch((error) => {
                    console.log('error:' + error.toString());
                    this.setState({
                        confirmLoading: false
                    });
                    notification['error']({
                        message: '创建失败',
                        description: '新闻未成功创建!',
                    });
                });
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
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
                    <FormItem label="新闻地址链接">
                        {getFieldDecorator('newsurl', {
                            rules: [{required: true, message: '请输入新闻地址URL!'}],
                        })(<Input />)}
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
        showWindow: state.inputWindowReducer.showWindow
    };
};

const mapFuncToProps = (dispatch, ownProps) => {
    return {
        closeWindow: () => {
            dispatch(closeWindow())
        }
    };
};

export default connect(mapStateToProps, mapFuncToProps)(Form.create()(NewsInput));