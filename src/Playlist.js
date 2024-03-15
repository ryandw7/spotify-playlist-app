import React from 'react';
import styles from './App.module.css';
import Track from './Track';
export default function Playlist({ playList }){
    return (
        <div className={styles.playList}>
            <input type="text" name="playlistName" placeholder="Playlist Name" />
            <button type="submit">Save</button>
            {playList.map((track)=>{
               return <Track track={track}/>
            })}
        </div>
    )
}