import React from 'react';
import authFlow from './authFlow';
import styles from './Auth.module.css'
export default function Authorization(){
    const url = authFlow();
    
    return (
        <div className={styles.div}>
            <h1 className={styles.h1}>Spotify Playlist Builder</h1>
            <a href={url} className={styles.a}>Link Spotify Account </a>
        </div>
    )
}