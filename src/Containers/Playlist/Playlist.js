import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../../Components/Track/Track';
import postPlaylist from '../../API Pipelines/postPlayList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';


//Component to contain playlist tracks and update playlist name
export default function Playlist({ playList, removePlayListTrack, setName, name, exportedAlert }) {

    //Change return if user clicks edit button
    const [nameChange, setNameChange] = useState(false);
    const handleEdit = () => {
        setNameChange(true)
    }

    //Export playlist data to user spotify account
    const exportButtonStyle = () => {
        if(exportTimeout){
            return styles.exportButtonTimeout;
        }else{
            return styles.exportButton;
        }
    }
    //Prevent export from occuring more than once in a five second window, darken button to visualize feature
    const [exportTimeout, setExportTimeout] = useState(false);
    const handleExport = () => {
        if(!exportTimeout){
        postPlaylist(playList, text);
        exportedAlert();
        setExportTimeout(true);
        setTimeout(()=>{
            setExportTimeout(false);
        }, 5000)
        }
    }


    //Detect text change and update value
    const [text, setText] = useState('Playlist')
    const handleChange = (e) => {
        setText(e.target.value)
    }

    //Set name to text value, if none given, default to 'Playlist
    const handleSaveName = (e) => {
        e.preventDefault();
        const isBlank = () => {
            const arr = text.split(' ');
            for (let i = 0; i < text.length; i++) {
                if (arr[i] !== '') {
                    return false;
                } else {
                    return true;
                }
            }
        }
        isBlank() || !text ? setName('Playlist') : setName(text);
        setNameChange(false);
    }


    return (
        <div className={styles.playList}>
            <div className={styles.playListTitle}>
                {nameChange
                    ?
                    <form onSubmit={handleSaveName} className={styles.playListTitle}>
                        <input type="text" name="playlistName" placeholder={name} onChange={handleChange} />
                        <button type="submit" className={styles.editButton}><FontAwesomeIcon icon={faCheck} /></button>
                    </form>
                    :
                    <div className={styles.playListTitle}>
                        <h2>{name}</h2>
                        <button onClick={handleEdit} className={styles.editButton}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </div>
                }
            </div>
            <div className={styles.playListTracks}>
                {playList.map((track) => <Track track={track} key={`PlayList_${track.id}`} handleClick={removePlayListTrack} text={'x'} />)}
            </div>
            <button className={exportButtonStyle()} onClick={handleExport}><FontAwesomeIcon icon={faPenToSquare} /></button>

        </div>
    )
}