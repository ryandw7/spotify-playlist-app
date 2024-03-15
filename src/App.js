import React, { useEffect, useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './App.module.css';
import { testTracks } from './testTracks.js';


function App() {
  //Recieve search value from search bar after submit is pressed;
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
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

  //Logic to add tracks to playlist
  const [playList, setPlayList] = useState([]);
  const addPlayListTrack = (track) => {
    setPlayList((prev) => {return prev = [...prev, { name: track.name, artist: track.artist, album: track.album, id: track.id }]})
  }

  const removePlayListTrack = (track) => {
    setPlayList((prev) => {
      prev = prev.filter((item) => item !== track)
    })
  }

  return (

    <div className={styles.app}>
      <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch} />
      <SearchResults currentSearch={currentSearch} validTracks={validTracks} addPlayListTrack={addPlayListTrack}/>
      <Playlist removePlayListTrack={removePlayListTrack} playList={playList}/>
    </div>
  );
}

export default App;
