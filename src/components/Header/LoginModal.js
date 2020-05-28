import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, Label,
    Form, FormGroup, Input, FormFeedback, TabContent, TabPane
} from 'reactstrap';
import classnames from 'classnames';
import Util from '../Alert/Util';

// ?? Need validation
class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            validatePassword: false
        };

        this.toggleTab = this.toggleTab.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    handleLogin(event) {
        this.props.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value })
            .then(
                () => {
                    if (this.props.auth.isAuthenticated)
                        Util.alert(true, "Login Successful");
                    else
                        Util.alert(false, "Login Failed");
                }
            )
        event.preventDefault();
    }

    handleSignup(event) {
        this.props.toggleModal();
        var newUser = {
            username: this.usernameSignup.value,
            password: this.passwordSignup.value,
            firstname: this.firstname.value,
            lastname: this.lastname.value,
        }
        console.log(newUser);
        this.props.signupUser(newUser)
            .then(
                () => {
                    if (this.props.auth.isAuthenticated)
                        Util.alert(true, "Signup Successful");
                    else
                        Util.alert(false, "User exists. Please try again");
                }
            )
        event.preventDefault();
    }

    validatePassword() {
        this.setState({ validatePassword: (this.passwordSignup.value === this.passwordConfirm.value) ? true : false })
    }

    render() {
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <ModalHeader className="container" toggle={this.props.toggleModal}>
                    <div className="row">
                        <div className={classnames({ active: this.state.activeTab === '1' }, "col-6")}
                            onClick={() => this.toggleTab('1')}>Login</div>
                        <div className={classnames({ active: this.state.activeTab === '2' }, "col-6")}
                            onClick={() => this.toggleTab('2')} >Register</div>
                    </div>
                </ModalHeader>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input} />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                            innerRef={(input) => this.remember = input} />
                                                Remember me
                                            </Label>
                                </FormGroup>
                                <Button type="submit" value="submit">Login</Button>
                            </Form>
                        </ModalBody>
                    </TabPane>
                    <TabPane tabId="2">
                        <ModalBody>
                            <Form onSubmit={this.handleSignup}>
                                <FormGroup className="row">
                                    <Label className="col-12" htmlFor="firstname lastname">Name</Label>
                                    <div className="col-6">
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="First name"
                                            innerRef={(input) => this.firstname = input}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <Input type="text" id="lastname" name="lastname"
                                            placeholder="Last name"
                                            innerRef={(input) => this.lastname = input} />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="usernameSignup">Username</Label>
                                    <Input type="text" id="usernameSignup" name="usernameSignup"
                                        innerRef={(input) => this.usernameSignup = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="passwordSignup">Password</Label>
                                    <Input type="password" id="passwordSignup" name="passwordSignup"
                                        innerRef={(input) => this.passwordSignup = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="passwordConfirm">Confirm Password</Label>
                                    <Input type="password" id="passwordConfirm" name="passwordConfirm"
                                        innerRef={(input) => this.passwordConfirm = input}
                                        valid={this.state.validatePassword}
                                        invalid={!this.state.validatePassword}
                                        onChange={this.validatePassword}
                                    />
                                    <FormFeedback invalid>Confirm password does not match.</FormFeedback>
                                </FormGroup>
                                <Button disabled={!this.state.validatePassword} type="submit" value="submit">Register</Button>
                            </Form>
                        </ModalBody>
                    </TabPane>
                </TabContent>
            </Modal >
        )
    }
}

export default LoginModal;
