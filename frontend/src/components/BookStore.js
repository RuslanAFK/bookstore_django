import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import Books from "./Books";
import {Button} from "react-bootstrap";


const BookStore = () => {

    const href = window.location.search;
    const params = new URLSearchParams(href)
    let page = params.get('page')?parseInt(params.get('page')):1;
    let search = params.get('search')?('?search='+params.get('search')):'';

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    let res = [];

    useEffect(()=>{
        const getBooks = async () => {
            setLoading(true);
            try {
                res = await axios.get('/server/books'+href);
            }catch (e) {
                alert('You saw all books!');
                window.location.href = '/books';
            }
            setBooks(res.data.results);
            setLoading(false);
        }
        getBooks();
    }, []);


    return (
        <div>
            <h1>Page {page}</h1>
            <Books books={books} loading={loading}/>
            {(page>1)?
                <Button className="pull-left" onClick={()=> {
                    page -= 1;
                    window.location.href = '/books?page=' + page + search;
                }
                }>To page {page-1}</Button>
                :
                <div></div>
            }
            <Button className="pull-right" id="snd-but" onClick={() => {
                page += 1;
                window.location.href = '/books?page=' + page + search;
            }
            }>To page {page + 1}</Button>
        </div>
    );

}

export default BookStore;