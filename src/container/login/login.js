import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Container, Badge } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormErrors from '../../container/FormErrors/FormErrors';
import * as authAction from '../../action/auth.js';
class Login extends Component {
    state = {
        email: "",
        password: "",
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    btnLogin_Click(e) {
        e.preventDefault();
        this.validateForm();
        this.props.action.auth.loginUser(this.state);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    render() {
        var error = "";
        if (this.props.error_msg) {
            error = this.props.error_msg;
        }
        return (
            <div>
                <Container>
                    <h1>Login</h1>
                    <hr />
                    <div className="panel panel-default" style={{ "color": "red" }}>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <Form>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" placeholder="Email" onChange={this.handleChange.bind(this)} value={this.state.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" placeholder="Password" onChange={this.handleChange.bind(this)} value={this.state.password} />
                            <div style={{ "color": "red" }}>
                                <p>{error}</p>
                            </div>
                        </FormGroup>
                        <button disabled={!this.state.formValid} onClick={this.btnLogin_Click.bind(this)}>Login</button>{' '}
                        <Badge href="/register">Register</Badge>
                    </Form>
                </Container >
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth,
        error_msg: auth.error_msg   
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        auth: bindActionCreators(authAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)