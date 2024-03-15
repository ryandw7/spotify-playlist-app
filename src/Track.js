import React from 'react';
import styles from './App.module.css';

export default function Track({track}){
   return (
        <div className={styles.track}>
           <h3>{track.name}</h3>
           <h4>{track.artist}</h4>
           <p>{track.album}</p>
        </div>
    ) 
}