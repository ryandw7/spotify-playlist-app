import React, { useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './App.module.css';
import { testTracks } from './testTracks.js';
let validTracks = [];
function renderTracks(search){
  for(const track in testTracks){
    if(search === track.name || track.album || track.artist){
    validTracks.push(track);
    console.log(validTracks)
    }else{
      console.log(track.name)
    }
  }
  
}
function App() {
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
    renderTracks(currentSearch);
    console.log(testTracks);
  }

  return (
   
    <div className={styles.app}>
    <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch}/>
    <SearchResults currentSearch={currentSearch}/>
    <Playlist />
    </div>
  );
}

export default App;
