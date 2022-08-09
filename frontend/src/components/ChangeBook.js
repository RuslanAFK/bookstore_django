import React from "react";
import {Button, Form} from "react-bootstrap";


class ChangeBook extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value,
        });
    }


    handleImageChange = (e) => {
        this.setState({
            image: e.target.value,
        });
    }

    ifValid(data) {
        return !data.error;
    }

    login(data) {
        alert("The book "+data.name+" is successfully edited!");
    }

    raiseErr(data) {
        let errText;
        if(data.error.name){
            errText = data.error.name[0];
            document.getElementById('c_name').setCustomValidity(errText);
            document.getElementById('c_name').reportValidity();
        }else if(data.error.image){
            errText = data.error.image[0];
            document.getElementById('c_image').setCustomValidity(errText);
            document.getElementById('c_image').reportValidity();
        }else{
            console.log(data);
        }
    }


    handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
            })
        }
        fetch('/server/change/', requestOptions).then((response)=>
            response.json()
        ).then((data)=>this.ifValid(data)?this.login(data):this.raiseErr(data));
    }


    render(){
        return(
            <Form className="rl_form">

                <h1>Edit Book</h1>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={this.handleNameChange}
                    placeHolder="Cinderella in the woods"
                    pattern=".{3,40}"
                    id="c_name"
                    required
                />
                <Form.Text className="text-warning">
                    One book must be with this name.
                </Form.Text>
                <br/>

                <Form.Control
                    onChange={this.handleImageChange}
                    id="c_image"
                    placeholder="https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612"
                    aria-required
                />
                <Form.Text className="text-warning">
                    Enter image url.
                </Form.Text>
                <br/>

                <Button onClick={this.handleSubmit}>Change image</Button>
            </Form>
        )
    }
}


export default ChangeBook;
