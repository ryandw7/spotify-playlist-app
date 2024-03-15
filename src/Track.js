import React from 'react';
import styles from './App.module.css';

export default function Track({track, addPlayListTrack}){
   const addTrack = (e) => {
    addPlayListTrack(e.target)
   }
   return (
        <div className={styles.track} id={track.id}>
           <h3>{track.name}</h3>
           <h4>{track.artist}</h4>
           <p>{track.album}</p>
           <button onClick={addTrack}>Add</button>
        </div>
    ) 
}