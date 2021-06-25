import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber } from 'antd';
import LoaderWidget from '../loader';
import "../../custom.css";
const { Search } = Input;


class Students extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        students: [],
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isEditModal: false,
        editStudent: {}
    }

    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Students: ', nextProps);
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            students: nextProps.students,
            currentPage: nextProps.currentPage,
            totalCount: nextProps.totalCount,
            sizeOfPage: nextProps.sizeOfPage,
            courses: nextProps.courses
        }
        );
        console.log('Courses: ', nextProps.courses);
    }

    onSearch = value => {
        this.props.getStudent(this.state.currentPage, value)
    }

    componentDidMount() {
        this.props.getStudent(this.state.currentPage);
    }

    handleCancel = () => {
        this.setState({
            isEditModal: false
        })
    };

    showModel = (key) => {
        var student = this.state.students.find(x => x.key === key);
        console.log(student)
        this.setState({
            isEditModal: true,
            editStudent: student
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
            console.log("State on edit: ", this.state)
            const editedStudent = {
                id: this.state.editStudent.key,
                name: (values.name ? values.name : this.state.editStudent.name),
                lastname: (values.lastname ? values.lastname : this.state.editStudent.lastname),
                email: (values.email ? values.email : this.state.editStudent.email),
                age: (values.age ? values.age : this.state.editStudent.age)
            }
            this.props.editStudent(editedStudent);
            this.props.getStudent(this.state.currentPage);
            this.handleCancel();

        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: {
                    compare: (a, b) => a.name.length - b.name.length,
                },
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
                sorter: {
                    compare: (a, b) => a.lastname.length - b.lastname.length,
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                sorter: {
                    compare: (a, b) => a.age - b.age,
                },
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: {
                    compare: (a, b) => a.email.length - b.email.length,
                },
            },
            {
                title: 'Action',
                dataIndex: 'key',
                render: (key) => (
                    <Button onClick={(e) => { this.showModel(key); }} type="primary" danger>
                        Edit
                    </Button>
                ),
            }

        ];

        const columnsCourses = [
            {
                title: 'This student is enrolled in courses:',
                dataIndex: 'title',
            },
            {
                title: '',
                dataIndex: 'startDate',
            }
        ]

        const { loading, currentPage, totalCount } = this.state;

        const pages = [];
        for (let i = 1; i <= Math.ceil(totalCount / 15); i++) {
            pages.push(i);
        }

        const tableProps = {
            expandedRowRender: student => (console.log(student.courses),
                <Table columns={columnsCourses} dataSource={student.courses} pagination={false} />
            )
        };

        console.log(totalCount);

        return (
            <Fragment>
                <div className="container">
                    <h2>Students manager:</h2>
                    <div className="main-panel">
                        <Search placeholder="Search..." onSearch={this.onSearch} enterButton ></Search>
                        <Table {...tableProps} columns={columns} dataSource={this.state.students} pagination={false} ></Table>

                    </div>
                    {totalCount > 0 && <div className="pagination text-center">
                        {pages.map((page, index) =>
                            <span className={currentPage === page ? "active" : "page"}
                                key={index}
                                onClick={() => this.props.getStudent(page)}>
                                {page}
                            </span>)}
                    </div>}

                    <Modal footer={null} title="Edit student" visible={this.state.isEditModal} onCancel={this.handleCancel}>
                        <Form {...layout} name="basic" initialValues={{
                            remember: true,
                        }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                            <Form.Item label="Email" name="email" >
                                <Input placeholder={this.state.editStudent.email} />
                            </Form.Item>


                            <Form.Item label="Name" name="name" >
                                <Input placeholder={this.state.editStudent.name} />
                            </Form.Item>

                            <Form.Item label="Last Name" name="lastname" >
                                <Input placeholder={this.state.editStudent.lastname} />
                            </Form.Item>

                            <Form.Item label="Age" name="age" >
                                <InputNumber placeholder={this.state.editStudent.age} />
                            </Form.Item>


                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>

                    </Modal>
                </div>
                {loading && <LoaderWidget />}
            </Fragment>
        );
    }
}


export default Students