import React from "react";
import {Button, Form} from "react-bootstrap";
import {BrowserRouter, BrowserRouter as Router, Link, Route, Routes, Navigate} from "react-router-dom";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_admin: false,
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    ifValid(data) {
        return !data.error;
    }

    login(data) {
        //alert(data.username+", you are successfully logged in!");
        //this.props.history.push("/signup");
        window.location.href = `user?id=${data.id}`;

    }

    raiseErr(data) {
        let errText;
        if(data.error.username){
            errText = data.error.username[0];
            document.getElementById('l_username').setCustomValidity(errText);
            document.getElementById('l_username').reportValidity();
        }else if(data.error.password) {
            errText = data.error.password[0];
            document.getElementById('l_password').setCustomValidity(errText);
            document.getElementById('l_password').reportValidity();
        }
        //alert(data.error);
    }

    handleSubmit = (e) => {
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        }
        fetch('/server/login/', requestOptions).then((response)=>
            response.json()
        ).then((data)=>this.ifValid(data)?this.login(data):this.raiseErr(data));
    }


    render() {
        return(
            <div>
                <Form className="rl_form" id="login_form">
                    <h1>Log In</h1>

                    <Form.Label htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        onChange={this.handleUsernameChange}
                        name="username"
                        placeHolder="john123"
                        pattern="^[a-z]{4,10}[0-9]{0,4}$"
                        id="l_username"
                        required
                    />
                    <Form.Text className="text-warning">
                        Your username must be valid.
                    </Form.Text>
                    <br/>

                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        onChange={this.handlePasswordChange}
                        name="password"
                        placeHolder="my_password1*/"
                        pattern=".{10,16}"
                        type="password"
                        id="l_password"
                        required
                    />
                    <Form.Text className="text-warning">
                        Your password must be same as in database.
                    </Form.Text>
                    <br/>

                    <Link to='/signup'>Not registed yet?</Link>
                    <br/>
                    <br/>

                    <Button onClick={this.handleSubmit}>Log In</Button>
                </Form>

        </div>

        )
    }
}

export default Login;
