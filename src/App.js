import React from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
    <SearchBar className={styles.searchBar}/>
    <SearchResults />
    <Playlist />
    </div>
  );
}

export default App;
