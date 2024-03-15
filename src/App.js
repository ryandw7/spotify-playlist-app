import React, { useEffect, useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './App.module.css';
import { testTracks } from './testTracks.js';


function App() {
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
  }
 const [validTracks, setValidTracks] = useState([])
  useEffect(()=>{
    setValidTracks([]);
    renderTracks(currentSearch);
    //eslint-disable-next-line
  }, [currentSearch])
 useEffect(()=>{
  console.log(validTracks)
 }, [validTracks])
  const renderTracks = (search) => {
    for(const track in testTracks){
      if(search === testTracks[track].name || search === testTracks[track].album || search === testTracks[track].artist){
      setValidTracks((prev) => [...prev, testTracks[track]]);
      
      }
    }
    
  }
  return (
   
    <div className={styles.app}>
    <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch}/>
    <SearchResults currentSearch={currentSearch} validTracks={validTracks}/>
    <Playlist />
    </div>
  );
}

export default App;
