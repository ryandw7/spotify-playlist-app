import React from 'react';
import styles from './SearchResults.module.css';
import Track from '../../Components/Track/Track'
export default function SearchResults({currentSearch, validTracks, addPlayListTrack}) {
    
    return (
        <div className={styles.searchResults}>
            {currentSearch !== '' && <h2>Results for {currentSearch}</h2>}
            {validTracks.map((track)=><Track track={track} key={`ResultList_${track.id}`} handleClick={addPlayListTrack} text={'+'}/>)}
        </div>
    )
}