import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import "../../custom.css";
import FacebookLogin from 'react-facebook-login';
import LoaderWidget from '../loader';
// import "react-notifications/lib/notifications.css";
// import {NotificationManager} from "react-notifications";

class Login extends Component {
  state = {
    loading: this.props.loading,
    errors: this.props.errors,
    errorMessage: ""
  }

  //визивається при зміні даних у пропсах
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log('Change props', nextProps);
    this.setState({
      loading: nextProps.loading,
      errorMessage: nextProps.errors
    }
    );
  }

  render() {

    const onFinish = (values) => {
      console.log('Success:', values);
      this.props.loginUser(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const responseFacebook = (response) => {
      var model = {
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        accessToken: response.accessToken
      }

      this.props.loginFacebook(model);
    }

    const { errorMessage, loading } = this.state;

    return (
      <Fragment>
        <div class="login-page container">
          <div class="form">
            <h2 className="base-color">Login </h2>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <label>Email:</label>

              <Form.Item

                name="email"

                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                    type: 'email'
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <label>Password:</label>
              <Form.Item

                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {errorMessage ? (<Alert message={errorMessage} type="error" className="m10" showIcon />) : (<p></p>)}

              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
                            </Button>
                <FacebookLogin
                  appId="435626964379338"
                  autoLoad={false}
                  fields="first_name,last_name,picture,email"
                  callback={responseFacebook}
                  cssClass="ant-btn-primary facebkBtn"
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        {loading && <LoaderWidget />}

      </Fragment>
    );
  }
}


export default Login