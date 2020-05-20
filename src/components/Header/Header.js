import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import {
    Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse,
    Button, Modal, ModalHeader, ModalBody, Row, Label, Col
} from 'reactstrap';
import { LocalForm, Control } from 'react-redux-form';
import { NavLink } from 'react-router-dom';
import './Header.css';

const LoginModal = (props) => {
    const handleLogin = (values) => {
        props.toggleModal();
        console.log("Current state: " + JSON.stringify(values));
        alert("Current state: " + JSON.stringify(values));
    }

    return (
        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm model="login" onSubmit={(values) => handleLogin(values)}>
                    <Row className="form-group">
                        <Label htmlFor="username" md={12}>Username</Label>
                        <Col md={12}>
                            <Control.text model=".username" id="username" name="username"
                                placeholder="Username"
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="password" md={12}>Password</Label>
                        <Col md={12}>
                            <Control.password model=".password" id="password" name="password"
                                placeholder="Password"
                                className="form-control"
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <div className="form-check">
                                <Label check>
                                    <Control.checkbox model=".remember" name="remember"
                                        className="form-check-input" />
                                        Remember me
                                    </Label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={12}>
                            <Button type="submit" color="primary">
                                Login
                                    </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
    );
}

const Header = ({ sticky }) => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleNav = () => setNavOpen(!isNavOpen);
    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <>
            <Navbar className={sticky ? "navbar-sticky" : ""} expand="md">
                <NavbarBrand className="navbar--logo-holder">
                    {sticky ? <img src={Logo} alt="logo" className="navbar--logo" /> : null}
                    <h2> Quinx</h2>
                </NavbarBrand>
                <NavbarToggler className="navbar-dark" onClick={toggleNav} />
                <Collapse navbar isOpen={isNavOpen} >
                    <Nav navbar className="navbar--link-list ml-auto">
                        <NavItem className="mx-auto">
                            <NavLink className="navbar--link-item" to="/home"> Home </NavLink>
                        </NavItem>
                        <NavItem className="mx-auto">
                            <NavLink className="navbar--link-item" to="/about"> About </NavLink>
                        </NavItem>
                        <NavItem className="mx-auto">
                            <NavLink className="navbar--link-item" to="/menu"> Menu </NavLink>
                        </NavItem>
                        <NavItem className="mx-auto">
                            <NavLink className="navbar--link-item" to="/contact"> Contact </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <Button outline onClick={toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span> Login
                        </Button>
                    </Nav>
                </Collapse>
                <LoginModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
            </Navbar>
        </>
    );
}

export default Header;

