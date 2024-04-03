import React from 'react';
import styles from './SearchResults.module.css';
import Track from '../../Components/Track/Track'
export default function SearchResults({currentSearch, validTracks, addPlayListTrack}) {
    
    return (
        <div className={styles.searchResults}>
            <div className={styles.searchResultsTitle}>
            {currentSearch !== '' ? <h2>Results for {currentSearch}</h2> : <h2></h2>}
            </div>
            <div className={styles.searchResultsTracks}>
            {validTracks.map((track)=><Track track={track} key={`ResultList_${track.id}`} handleClick={addPlayListTrack} text={'+'}/>)}
            </div>
        </div>
    )
}