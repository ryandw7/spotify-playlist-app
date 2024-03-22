import React, { useEffect, useState } from 'react';
import Playlist from '../Playlist.js';
import SearchBar from '../SearchBar.js';
import SearchResults from '../SearchResults.js';
import styles from '../App.module.css';
import data from '../testTracks.json';
import authFlow from '../calls.js';

function App() {
  const testTracks = data;
  //Recieve search value from search bar after submit is pressed;
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
    authFlow()
  }

  //Filter through test track and return correlated tracks
  const [validTracks, setValidTracks] = useState([])
  useEffect(() => {
    setValidTracks([]);
    renderTracks(currentSearch);
    //eslint-disable-next-line
  }, [currentSearch])
  useEffect(() => {
    console.log(validTracks)
  }, [validTracks])
  const renderTracks = (search) => {
    for (const track in testTracks) {
      if (search === testTracks[track].name || search === testTracks[track].album || search === testTracks[track].artist) {
        setValidTracks((prev) => [...prev, testTracks[track]]);
      }
    }

  }


//tracks added to playlist
  const [playList, setPlayList] = useState([]);
  //Logic to add tracks to playlist
  const addPlayListTrack = (track) => {
    const newTrack = validTracks.filter((item)=> item.id === track.id);
    setPlayList((prev) => [...prev, newTrack[0]]);
    console.log(playList)
  }

  //Logic to remove tracks from play list
  const removePlayListTrack = (track) => {
    const newTracks = playList.filter((item)=> item.id !== track.id);
    setPlayList(newTracks);
    console.log(playList)
  }

  //PLAYLIST NAME
  const [name, setName] = useState('Playlist');
  
  return (

    <div className={styles.app}>
      <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch} />
      <SearchResults currentSearch={currentSearch} validTracks={validTracks} addPlayListTrack={addPlayListTrack}/>
      <Playlist removePlayListTrack={removePlayListTrack} playList={playList} setName={setName} name={name}/>
    </div>
  );
}

export default App;
