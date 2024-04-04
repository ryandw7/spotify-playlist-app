import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css'
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
            <form onSubmit={handleSubmit} className={styles.form}>
                <input className={styles.input} id="search" type="text" value={text} onChange={handleChange} placeholder="Search..."/>
                <button type="submit" className={styles.searchButton}><FontAwesomeIcon icon={faArrowRight} /></button>
            </form>
        </div>
    )
}