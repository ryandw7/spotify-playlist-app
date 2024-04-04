import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../../Components/Track/Track';
import postPlaylist from '../../API Pipelines/postPlayList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
export default function Playlist({ playList, removePlayListTrack, setName, name }) {
    const [nameChange, setNameChange] = useState(false);

    const handleExport = () => {
      postPlaylist(playList, text)
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
            <button className={styles.exportButton} onClick={handleExport}><FontAwesomeIcon icon={faPenToSquare} /></button>

        </div>
    )
}