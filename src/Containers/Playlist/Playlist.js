import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../../Components/Track/Track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
export default function Playlist({ playList, removePlayListTrack, setName, name }) {
    const [nameChange, setNameChange] = useState(false);
    const retrieveID = async () => {
        const res = await fetch('https://api.spotify.com/v1/me?access_token=' + window.sessionStorage.getItem("token"))
        const data = await res.json();
        const USER_ID = data.id;
        return USER_ID;
    }

    const POSTPLAYLIST = async () => {
        const userID = await retrieveID();
        const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": text,
                "description": "New playlist description",
                "public": false
            }),
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();
        const PLAYLIST_ID = await data.id;
        return PLAYLIST_ID;
    }

    const ADDTRACKS = async () => {
        const playListID = await POSTPLAYLIST();
        const url = `https://api.spotify.com/v1/playlists/${playListID}/tracks`
        let playListURIs = playList.map(track => track.uri);
        console.log(playListURIs)
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "uris": playListURIs,
                "position": 0,
            }),
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        console.log(res.json());
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
            <div className={styles.playListTitle}>
                {nameChange ?
                    <form onSubmit={handleSubmit} className={styles.playListTitle}>
                        <input type="text" name="playlistName" placeholder={name} onChange={handleChange} />
                        <button type="submit" className={styles.editButton}><FontAwesomeIcon icon={faCheck} /></button>
                    </form>
                    :
                    <div className={styles.playListTitle}>
                        <h2>{name}</h2>
                        <button onClick={handleClick} className={styles.editButton}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </div>
                   
                }
            </div>
            <div className={styles.playListTracks}>
                {playList.map((track) => <Track track={track} key={`PlayList_${track.id}`} handleClick={removePlayListTrack} text={'x'} />)}
            </div>
            <button className={styles.exportButton} onClick={ADDTRACKS}><FontAwesomeIcon icon={faPenToSquare} /></button>

        </div>
    )
}