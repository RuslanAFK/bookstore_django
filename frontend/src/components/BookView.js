import React, {Component} from 'react';
import {Image} from "react-bootstrap";


class BookView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            info: '',
            genre: '',
            image: '',
            author: '',
        }
        this.getBookDetails();
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

    getBookDetails() {
        const search = window.location.search;
        fetch('/server/get_book'+search).then((response)=>
        response.json())
           .then((data)=>this.ifValid(data)?(
            this.setState({
                name: data.name,
                info: data.info,
                genre: data.genre,
                image: data.image,
                author: data.author,
            })):this.raiseErr(data));
    }



    render() {
        return (
            <div>
                <Image src={this.state.image} alt="Image" width={350} height={500}/>
                <h1>Book {this.state.name}</h1>
                <p>Author: {this.state.author}</p>
                <p>Tags: {this.state.genre}</p>
                <p>Description: {this.state.info}</p>
            </div>
        );
    }
}

export default BookView;