import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Button} from 'antd';
import "../custom.css";
import './NavMenu.css';
import { connect } from 'react-redux';
import NavbarService from './services/navBar_service';
import {Logout} from './login/action'

class NavMenu extends Component {

  state = {
    isAuthenticated: this.props.isAuthenticated
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log('Change props', nextProps);
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });
  }

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: this.props.isAuthenticated
    });
  }

  render() {
    const {logout} = this.props
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">School but not</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {
                  NavbarService.isRole() === "Admin" && (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/panelStudent">Student manager</NavLink>
                    </NavItem>
                  )
                }
                {
                  NavbarService.isRole() === "Admin" && (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/panelCourses">Course manager</NavLink>
                    </NavItem>
                  )
                }
                {
                  NavbarService.isRole() === "Student" && (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/courses">Courses</NavLink>
                    </NavItem>
                  )
                }
                {
                  this.state.isAuthenticated === false && (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                    </NavItem>
                  )
                }
                {
                  this.state.isAuthenticated === false && (
                    <NavItem>
                      <NavLink tag={Link} type="primary" className="text-dark" to="/register">Register</NavLink>
                    </NavItem>
                  )
                }
                {
                  NavbarService.isRole() === "Student" && (
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                    </NavItem>
                  )
                }
                {
                  this.state.isAuthenticated === true && (
                    <NavItem>
                      <NavLink className="text-dark" onClick={logout}>Logout</NavLink>
                    </NavItem>
                  )
                }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

const mapState = (stateRedux) => {
  return {
    isAuthenticated: stateRedux.login.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(Logout)
  }
}


export default connect(mapState, mapDispatchToProps)(NavMenu)