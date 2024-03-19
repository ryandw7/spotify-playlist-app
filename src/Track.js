import React from 'react';
import styles from './App.module.css';

export default function Track({track, handleClick, text}){
   const childClickHandler = () => {
    handleClick(track)
    console.log(track.id)
   }
   return (
        <div className={styles.track} key={`key_${track.id}`}>
           <h3>{track.name}</h3>
           <h4>{track.artist}</h4>
           <p>{track.album}</p>
           <button onClick={childClickHandler} track={track}>{text}</button>
        </div>
    ) 
}