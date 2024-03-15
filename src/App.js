import React, { useEffect, useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './App.module.css';
import { testTracks } from './testTracks.js';
let validTracks = [];

function App() {
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
  }

  useEffect(()=>{
    renderTracks(currentSearch);
  }, [currentSearch])

  const renderTracks = (search) => {
    for(const track in testTracks){
      if(search === testTracks[track].name || search === testTracks[track].album || search === testTracks[track].artist){
      validTracks.push(testTracks[track]);
      
      }
    }
    console.log(validTracks)
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
