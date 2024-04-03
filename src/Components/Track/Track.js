import React from 'react';
import styles from './Track.module.css';

export default function Track({ track, handleClick, text }) {
    const childClickHandler = () => {
        handleClick(track)
        console.log(track)
    }
    return (
        <div className={styles.track} key={`key_${track.id}`}>
            <img className={styles.img} src={track.album.images[0].url} width="40px" height="40px" />
            <div className={styles.text}>
                <h3>{track.name}</h3>
                <h4>{track.artists[0].name}</h4>
                <p>{track.album.name}</p>
            </div>
            <button className={styles.button} onClick={childClickHandler} track={track}>{text}</button>
        </div>
    )
}