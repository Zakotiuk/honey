import LoginPage from './components/login/index';
import RegisterPage from './components/registration/index';
import PanelPage from './components/workAboveStudents/index'
import React, { Component, Fragment,Suspense } from 'react';
import { Route } from 'react-router';
import './custom.css'
import {PrivateRoute} from './components/privateRouter'
import PanelCoursePage from './components/workAboveCourses/index'
import CoursePage from './components/coursesForStudent/index'
import { Home } from './components/Home';
import ProfilePage from './components/coursesForStudent/indexPrf'
import "react-notifications/lib/notifications.css";
import {NotificationContainer} from "react-notifications";

const Navbar = React.lazy(() => import('./components/NavMenu'));

export default class App extends Component {
  render(){
  return (

    <Fragment>
      <Suspense fallback={<p>Loading ...</p>}>
        <Navbar/>
        <NotificationContainer/>
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/register' component={RegisterPage}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/courses'component={CoursePage} />

        <PrivateRoute exact path="/panelStudent" roles={"Admin"} component={PanelPage} />{/* Admin panel with student-manager */}
        <PrivateRoute exact path="/panelCourses" roles={"Admin"} component={PanelCoursePage} />{/* Admin panel with course-manager */}
        <PrivateRoute exact path="/profile" roles={"Student"} component={ProfilePage} />
    </Suspense>
    </Fragment>
  );
}
}