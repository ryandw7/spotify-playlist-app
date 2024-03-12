import React, { useState } from 'react';
import styles from './App.module.css'
export default function SearchBar() {
    const [text, setText] = useState('');
    const handleChange = ({ target }) => {
    setText(target.value);
    }
    return (
        <div className={styles.searchBar}>
            <form>
                <input type="text" value={text} onChange={handleChange} placeholder="Search..."/>
            </form>
        </div>
    )
}