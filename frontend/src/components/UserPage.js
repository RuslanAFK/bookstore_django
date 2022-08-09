import React, {Component} from 'react';
import {Button, ButtonGroup, Form} from "react-bootstrap";


class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            is_admin: false,
            search: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }



    ifValid(data) {
        return !data.error;
    }

    raiseErr(data) {
        if(data.error.id){
            alert(data.error.id);
            window.location.href = '/';
        }
    }


    componentWillMount() {
        const search = window.location.search;
        fetch('/server/get_user'+search).then((response)=>
            response.json())
            .then((data)=>this.ifValid(data)?(
                this.setState({
                    username: data.username,
                    is_admin: data.is_admin,
                })):this.raiseErr(data));

    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value,
        });
    }

    handleSubmit = (e) => {
        window.location.href = '/books?search='+this.state.search;
    }

    render(){
        return (
            <div>
                <p>{this.state.is_admin?'Admin':'User'} Page of {this.state.username}</p>
                {this.state.is_admin?
                <ButtonGroup size="mb-2 w-100" className="mb-2">
                    <Button href="/upload">Upload</Button>
                    <Button href="/delete">Delete</Button>
                    <Button href="/change">Change</Button>
                </ButtonGroup>
                    :<div></div>}
                    <Form>
                <div className="input-group rounded">
                    <input type="search" onChange={this.handleSearchChange} className="form-control rounded" placeholder="Search"
                           aria-label="Search"
                           aria-describedby="search-addon"/>
                </div>
                    <Button onClick={this.handleSubmit} size="mb-2 w-100">Find</Button>
                    </Form>
            </div>
        );
    }
}

export default UserPage;