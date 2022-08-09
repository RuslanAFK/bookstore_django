import React, {Component} from 'react';
import Image from "react-bootstrap/cjs/Image";
import {Link} from "react-router-dom";


const Books = ({books, loading}) => {
    if(loading)
        return <h1>Loading...</h1>

    return (
        <ul className="list-group list-group-horizontal-md">
            {
                books.map((book, i)=>(
                    <li className="list-group-item">
                        <Link to={'/book?id='+book.id}><Image src={book.image} alt={book.name} height={500} width={350}/></Link>
                    </li>
                ))
            }

        </ul>
    );
}

export default Books;