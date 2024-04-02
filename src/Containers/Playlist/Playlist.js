import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../../Components/Track/Track'

export default function Playlist({ playList, removePlayListTrack, setName, name }) {
    const [nameChange, setNameChange] = useState(false);
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
            <form onSubmit={handleSubmit}>
                <input type="text" name="playlistName" placeholder={name} onChange={handleChange}/>
                <button type="submit">Save</button>
            </form>
                :
                <div>
                    <h2>{name}</h2>
                    <button onClick={handleClick}>Edit</button>
                </div>
            }
            {playList.map((track) => <Track track={track} key={`PlayList_${track.id}`} handleClick={removePlayListTrack} text={'Remove'} />)}
        </div>
    )
}