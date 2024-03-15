import React from 'react';
import styles from './App.module.css';
import TrackList from './TrackList';
export default function SearchResults({currentSearch}) {
    
    return (
        <div className={styles.searchResults}>
            {currentSearch !== '' && <h2>Results for {currentSearch}</h2>}
            <TrackList />
        </div>
    )
}