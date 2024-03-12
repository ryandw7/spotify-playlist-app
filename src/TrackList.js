import React from 'react';
import styles from './App.module.css';
import Track from './Track';

export default function TrackList() {
    return (
        <div className={styles.trackList}>
            <h3>I am the TrackList</h3>
            <Track />
        </div>
    )
}