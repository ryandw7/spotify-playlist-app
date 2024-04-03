import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../../Components/Track/Track'

export default function Playlist({ playList, removePlayListTrack, setName, name }) {
    const [nameChange, setNameChange] = useState(false);
    const retrieveID = async () => {
    const res = await fetch('https://api.spotify.com/v1/me?access_token=' + window.localStorage.getItem("token"))
    const data = await res.json();
    const USER_ID = data.id;
    return USER_ID;
    }

    const POSTPLAYLIST = async () => {
        const userID = await retrieveID();
        const url = `https://api.spotify.com/v1/users/${userID}/playlists`
        const res = await fetch(url, {
  method: "POST",
  body: JSON.stringify({
    "name": "name",
    "description": "New playlist description",
    "public": false
}),
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-type": "application/json; charset=UTF-8"
  }
});
    await res.json();
    
    }
    const [text, setText] = useState('')
    const handleClick = () => {
        setNameChange(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setName(text);
        setNameChange(false)
    }

    const handleChange = (e) => {
        setText(e.target.value)
    }
    return (
        <div className={styles.playList}>
            {nameChange ? 
            <form onSubmit={handleSubmit} className={styles.name}>
                <input type="text" name="playlistName" placeholder={name} onChange={handleChange}/>
                <button type="submit">Save</button>
            </form>
                :
                <div className={styles.name}>
                    <h2>{name}</h2>
                    <button onClick={handleClick}>Edit</button>
                </div>
            }
            {playList.map((track) => <Track track={track} key={`PlayList_${track.id}`} handleClick={removePlayListTrack} text={'x'} />)}
            <button onClick={POSTPLAYLIST}>EXPORT</button>
        </div>
    )
}