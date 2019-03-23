import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Container, Badge } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as registerAction from '../../action/auth';
import FormErrors from '../../container/FormErrors/FormErrors';

class Register extends Component {
    state = {
        email: '',
        password: '',
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false
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



    btnRegister_Click(e) {
        e.preventDefault();
        this.validateForm();
        let userdata = {
            email: this.state.email,
            password: this.state.password,
            role: "user"
        }

        this.props.action.onRegister.RegisterUser(userdata);
        this.props.history.push('/login');
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    render() {
        return (
            <Container>
                <h1>Register</h1>
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
                    </FormGroup>
                    <button disabled={!this.state.formValid} onClick={this.btnRegister_Click.bind(this)}>Register</button>{' '}
                    <Badge href="/login">Login</Badge>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        onRegister: bindActionCreators(registerAction, dispatch)
    }
})

export default connect(null, mapDispatchToProps)(Register);