import React from "react";
import {Button, Form} from "react-bootstrap";



class Signup extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_admin: false,
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIsadminChange = this.handleIsadminChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange= (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleIsadminChange = (e) => {
        this.setState({
            is_admin: e.target.value,
        });
    }


    ifValid(data) {
        return !data.error;
    }

    login(data) {
        alert(data.username+", you are successfully signed up!");
    }

    raiseErr(data) {
        let errText;
        if(data.error.username){
            errText = data.error.username[0];
            document.getElementById('r_username').setCustomValidity(errText);
            document.getElementById('r_username').reportValidity();
        }else if(data.error.password){
            errText = data.error.password[0];
            document.getElementById('r_password').setCustomValidity(errText);
            document.getElementById('r_password').reportValidity();
        }else if(data.error.is_admin){
            errText = data.error.is_admin[0];
            document.getElementById('checkbox1').setCustomValidity(errText);
            document.getElementById('checkbox1').reportValidity();
        }
        console.log(data.error);
    }

    handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                is_admin: this.state.is_admin,
            }),
        }
        fetch('/server/signup/', requestOptions).then((response)=>
            response.json()
        ).then((data)=>this.ifValid(data)?this.login(data):this.raiseErr(data));
    }


    render(){
        return(
            <Form className="rl_form">

                <h1>Sign Up</h1>
                <Form.Label htmlFor="inputUsername">Username</Form.Label>
                <Form.Control
                    onChange={this.handleUsernameChange}
                    placeHolder="john123"
                    pattern="^[a-z]{4,10}[0-9]{0,4}$"
                    id="r_username"
                    required
                />
                <Form.Text className="text-warning">
                    Your username must contain 4-10 letters and then 0-4 numbers.
                </Form.Text>
                <br/>

                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control
                    onChange={this.handlePasswordChange}
                    placeHolder="my_password1*/"
                    pattern=".{10,16}"
                    type="password"
                    id="r_password"
                    required
                />
                <Form.Text className="text-warning">
                    Your password must be 10-16 characters long.
                </Form.Text>
                <br/>


                <Form.Check
                    onChange={this.handleIsadminChange}
                    label="I admin?"
                    id="checkbox1"
                    required={false}
                />
                <Button className="one_but" onClick={this.handleSubmit}>Sign Up</Button>
            </Form>
        )
    }
}


export default Signup;
