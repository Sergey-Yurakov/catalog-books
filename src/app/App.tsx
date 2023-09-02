import React, { useEffect } from 'react';
import logo from '../logo.svg';
import './App.css';
import axios from 'axios';

const fetchBooks = async (key: string) => {
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${key}`);
};

function App() {
    const apiKey = 'AIzaSyAJkpUtE2LA_6izCfv4tuYUESs1uqqaZyI';

    useEffect(() => {
        const initData = async () => {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&maxResults=35`
            );
            const data = await response.data;
            console.log('data', data);
            return data;
        };
        initData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
