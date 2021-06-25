import React, { Component, Fragment } from 'react';
import { Card, Col, Row, Button, Modal, Form, DatePicker } from 'antd';
import "./style.css";
import "../../custom.css";
import jwt from 'jsonwebtoken';
import LoaderWidget from '../loader'

const { Meta } = Card;

class CoursesForStudent extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isModal: false,
        selectCourseId: ""
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

    subCourse = (e) => {
        const id = e.target.value;
        this.setState({
            selectCourseId: id
        })
        this.showModel();
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

        const onFinish = (values) => {
            var token = localStorage.getItem('authToken');
            var decoded = jwt.decode(token);
            console.log(decoded);
            const model = {
                StudentId: decoded.id,
                CourseId: this.state.selectCourseId,
                StartDate: values.date._d
            }
            console.log(model.StudentId, model.CourseId, model.StartDate);

            this.props.subCourse(model);
            this.handleCancel();
            this.props.getCourse(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        const pages = [];
        for (let i = 1; i <= Math.ceil(this.state.totalCount / this.state.sizePage); i++) {
            pages.push(i);
        }
        const dateFormat = 'DD/MM/YYYY';

        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 textHeader">
                        <h2>Hello!</h2>
                        <h5>You here for finding your future.</h5>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-8 imgHeader" >
                        <img width="50%" src="https://www.publicdomainpictures.net/pictures/250000/velka/paper-creased-background-15229933209k9.jpg" />
                    </div>
                </div>
                <hr />
                <div>
                    <h2 className="titles bigText">/Our best courses</h2 >
                    <h5 className="titles smallText">Every courses are interesting and will give you unforgettable information.</h5>
                </div>
                <div className="container">
                    <div className="row">
                        {this.state.courses.map((course, index) =>
                            <Card
                                className="col-lg-4 col-md-4 col-sm-12"
                                hoverable
                                style={{ width: 240, marginTop: 10, height: 300, marginLeft: 50 }}
                                cover={<img height="200px" alt="example" src={course.image}
                                />}
                            >
                                <div className="row" value={course.id}>
                                    <Meta
                                        className="col-12"
                                        title={course.title}
                                        value={course.id} />
                                    <Button
                                        className="btn col-12 btnSub"
                                        type="primary"
                                        value={course.id}
                                        onClick={this.subCourse}
                                        htmlType="submit">Subscribe</Button>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
                <hr />
                <h3 className="titles bigText">/Follow us for having fresh information about new courses</h3 >

                <Row gutter={[16, 16]}>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />

                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                </Row>


                <Modal title="Subscribe on course" visible={this.state.isModal} footer={null} onCancel={this.handleCancel}>
                    <Form {...layout} name="basic" initialValues={{
                        remember: true,
                    }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                        <Form.Item label="Choose date:" name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose date!',
                                },
                            ]}
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                style={{marginLeft: 350 + "px"}} 
                                type="primary" 
                                htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>

                </Modal>
                {this.state.loading && <LoaderWidget />}
            </Fragment>


        );
    }
}


export default CoursesForStudent;