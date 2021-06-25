import React, { Component, Fragment } from 'react';
import { Button, Modal, Form, Card } from 'antd';
import "./style.css";
import "../../custom.css";
import jwt from 'jsonwebtoken';
import LoaderWidget from '../loader';

const { Meta } = Card;

class Profile extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        name: this.props.name,
        lastname: this.props.lastname,
        email: this.props.email,
        age: this.props.age,
        courses: this.props.courses,
        isModal: false,
        selectCourseId: ""

    }
    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            name: nextProps.name,
            lastname: nextProps.lastname,
            email: nextProps.email,
            age: nextProps.age,
            courses: nextProps.courses
        }
        );
    }

    showModel = () => {
        this.setState({
            isModal: true
        })
    };

    unsubCourse = (e) => {
        const id = e.target.value;
        this.setState({
            selectCourseId: id
        })
        this.showModel();
    };

    componentDidMount() {
        const token = localStorage.getItem("authToken");
        const decode = jwt.decode(token);
        this.props.getProfile(decode.id);
    }

    handleCancel = () => {
        this.setState({
            isModal: false
        })
    };


    render() {

        const unsubs = () => {
            var token = localStorage.getItem('authToken');
            var decoded = jwt.decode(token);
            const model = {
                StudentId: decoded.id,
                CourseId: this.state.selectCourseId
            }
            console.log(model.studentId, model.courseId, model.StartDate);
            this.props.unsubCourse(model);
            this.handleCancel();
        }

        const onFinish = (values) => {
            this.props.getCourse(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <img className="col-lg-6 col-md-6 col-sm-6 col-xs-6" src="https://i.pinimg.com/564x/80/a3/3a/80a33aafe15f51dcd45d03ef3c13491c.jpg" />
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <h4 style={{ textAlign: "center" }}>Your profile : </h4>
                            <table style={{ marginLeft: 150 + "px" }} border="0">
                                <tr>
                                    <td style={{ fontSize: 30 + "px" }}>Name : </td>
                                    <td></td>
                                    <td align="right" style={{ fontSize: 28 + "px" }}>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 30 + "px" }}>Last name :</td>
                                    <td></td>
                                    <td align="right" style={{ fontSize: 28 + "px" }}>{this.state.lastname}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 30 + "px" }}>Email :</td>
                                    <td></td>
                                    <td align="right" style={{ fontSize: 28 + "px" }}>{this.state.email}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontSize: 30 + "px" }}>Age :</td>
                                    <td></td>
                                    <td align="right" style={{ fontSize: 28 + "px" }}>{this.state.age}</td>
                                </tr>
                            </table>
                            <div className="row">
                                <h4 style={{ textAlign: "center" }}>Your courses : </h4>
                                {this.state.courses.map((course, index) =>
                                    <div className="col-4" key={index}>
                                        <Card
                                            hoverable
                                            style={{ width: 200, marginTop: 20 + "px" }}
                                            cover={<img alt="example" height="200px" src={course.image} />}
                                        >
                                            <Meta
                                                title="Start date :"
                                                description={course.startDate} />
                                            <Button
                                                className="btn col-12 btnSub"
                                                type="primary"
                                                value={course.id}
                                                onClick={this.unsubCourse}
                                                htmlType="submit">Unsubscribe</Button>
                                        </Card>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Modal title="Unsubscribe on course" visible={this.state.isModal} onOk={unsubs} onCancel={this.handleCancel}>

                    <Form name="basic" initialValues={{
                        remember: true,
                    }} onFinish={onFinish} onFinishFailed={onFinishFailed} >
                        <Form.Item label="Do you realy want to be unsubscribed on this course?"></Form.Item>
                    </Form>

                </Modal>

                {this.state.loading && <LoaderWidget />}
            </Fragment>
        );
    }
}
export default Profile;