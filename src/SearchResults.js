import React from 'react';
import styles from './App.module.css';
import TrackList from './TrackList';

export default function SearchResults() {
    return (
        <div className={styles.searchResults}>
            <h2>I am the search results</h2>
            <TrackList />
        </div>
    )
}