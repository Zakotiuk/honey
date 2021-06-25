import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber, Card } from 'antd';
import LoaderWidget from '../loader';
import "../../custom.css";
const { Search } = Input;


class Courses extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizeOfPage: this.props.sizeOfPage,
        isModal: false,
    }


    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Courses: ', nextProps);
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            courses: nextProps.courses,
            currentPage: nextProps.currentPage,
            totalCount: nextProps.totalCount,
            sizeOfPage: nextProps.sizeOfPage,
        }
        );
        console.log('Courses from state: ', nextProps.courses);
    }

    onSearch = value => {
        this.props.getCourse(this.state.currentPage, value)
    }

    componentDidMount() {
        this.props.getCourse();
    }

    handleCancel = () => {
        this.setState({
            isModal: false
        })
    };

    showModel = () => {
        this.setState({
            isModal: true
        })
    };

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };


        const onFinish = (values) => {
            const newCourse = {
                title: values.title,
                image: values.image
            }
            this.handleCancel();
            this.props.addCourse(newCourse);
            this.props.getCourse(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: {
                    compare: (a, b) => a.title.length - b.title.length,
                },
            },
            {
                title: 'Image',
                dataIndex: 'image',
                render:  (image) => <img src={image} width="200" />,
                sorter: {
                    compare: (a, b) => a.image.length - b.image.length,
                }
            },
          

        ];
        const { loading, currentPage, totalCount } = this.state;

        const pages = [];
        for (let i = 1; i <= Math.ceil(totalCount / 15); i++) {
            pages.push(i);
        }

        const tableProps = {
            expandedRowRender: record => (console.log(record.courses),
                <Table dataSource={record.courses} pagination={false} />
            )
        };

        return (
            <Fragment>
                <div className="container">
                    <h2>Course manager:</h2>
                    <div className="main-panel">
                        <Search style={{width: 700 + "px"}} placeholder="Search..." onSearch={this.onSearch} enterButton ></Search>
                        <Button style={{marginLeft: 30 + "px"}} onClick={(e) => { this.showModel(); }} type="primary" htmlType="submit">Add course</Button>

                        <Table {...tableProps} columns={columns} dataSource={this.state.courses} pagination={false} ></Table>
                    </div>
                    {totalCount > 0 && <div className="pagination text-center">
                        {pages.map((page, index) =>
                        <span className={currentPage === page ? "active" : "page"}
                            key={index}
                            onClick={() => this.props.getCourse(page)}>
                            {page}
                        </span>)}
                </div>}
                </div>
                <Modal title="Add new course" visible={this.state.isModal} onCancel={this.handleCancel}>
                    <Form {...layout} name="basic" initialValues={{
                            remember: true,
                        }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                        <Form.Item label="Course title:" name="title" 
                         rules={[
                            {
                              required: true,
                              message: 'Please input title!',
                            },
                          ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item label="Image URL:" name="image" 
                         rules={[
                            {
                              required: true,
                              message: 'Please input image URL!',
                            },
                          ]}
                        >
                            <Input/>
                        </Form.Item>


                        {/* <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item> */}
                    </Form>

                </Modal>
                {loading && <LoaderWidget />}
            </Fragment>
        );
    }
}


export default Courses