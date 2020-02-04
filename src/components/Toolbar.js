import React from "react";
import {Link, withRouter} from 'react-router-dom';
// Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
// Authentication
import {useAuth} from "../context/auth";

const Toolbar = (props) => {
    const auth = useAuth();

    const logOut = () => {
        auth.logout();
    };

    return (
        <Navbar collapseOnSelect expand="md" variant="dark">
            <Navbar.Brand>
                <img
                    src="../../logo.png"
                    width="180"
                    height="auto"
                    className="d-inline-block align-top"
                    alt="Rcs Lab Logo"
                />

            </Navbar.Brand>
            <h3 className="align-middle justify-content-start" style={{color: '#cecece'}}>
                {props.title}
            </h3>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="justify-content-end">
                    <Link exact to="/" className="nav-link">Home</Link>
                    <NavLink onClick={logOut}>Logout</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default withRouter(Toolbar);