import React, { useState } from 'react';
import styles from './App.module.css'
export default function SearchBar({ newSearch }) {
    const [text, setText] = useState('');
    const handleChange = ({ target }) => {
    setText(target.value);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    newSearch(text);
    setText('');
    }
    return (
        <div className={styles.searchBar}>
            <form onSubmit={handleSubmit}>
                <input id="search" type="text" value={text} onChange={handleChange} placeholder="Search..."/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}