import React, {Component} from "react";
import {render} from "react-dom"

import {BrowserRouter as Router, Routes, Redirect, Route, Link} from "react-router-dom";
import LoadBook from "./LoadBook";
import ChangeBook from "./ChangeBook";
import DeleteBook from "./DeleteBook";
import Login from "./Login";
import Signup from "./Signup";
import BookView from "./BookView";
import UserPage from "./UserPage";
import BookStore from "./BookStore";



export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            is_admin: false,
        };
    }

    render() {
        return(
            <div className="center">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>

                        <Route path="/upload" element={<LoadBook/>}/>
                        <Route path="/change" element={<ChangeBook/>}/>
                        <Route path="/delete" element={<DeleteBook/>}/>

                        <Route path="/books" element={<BookStore/>}/>
                        <Route path="/book" element={<BookView/>}/>}/>
                        <Route path="/user" element={<UserPage/>}/>
                    </Routes>
                </Router>
            </div>
        )
    }

}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);
