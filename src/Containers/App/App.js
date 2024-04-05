import React, { useEffect, useState } from 'react';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../../Components/Search/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import styles from './App.module.css';
import fetchResults from '../../API Pipelines/fetchResults.js';
import Authorization from '../../Auth/Authorization.js'

// https://api.spotify.com/v1/me
function App() {

  //store access token for api calls
  const [token, setToken] = useState('');

  //Check for auth token on first render, set local storage
  useEffect(() => {
    const hash = window.location.hash;
    let accessToken = window.sessionStorage.getItem("token");
    if (!accessToken && hash) {
      accessToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.sessionStorage.setItem("token", accessToken);
      window.sessionStorage.setItem("authorized", true);
    }
    setToken(accessToken);
  }, [])

  //Recieve search value from search bar after submit is pressed
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
  }

  //Filter through test track and return correlated tracks
  const [validTracks, setValidTracks] = useState([]);
  //Rerender results when search is pressed 
  useEffect(() => {
    setValidTracks([]);
    fetchResults(currentSearch, token, setValidTracks)
    // eslint-disable-next-line
  }, [currentSearch]);

  //tracks added to playlist
  const [playList, setPlayList] = useState([]);
  const [duplicateTrack, setDuplicateTrack] = useState(false);
  //Logic to add tracks to playlist
  const addPlayListTrack = (track) => {
    const newTrack = validTracks.filter((item) => item.id === track.id);
    let isDuplicate = false;
    for(let i = 0; i < playList.length; i++){
      if(track.id === playList[i].id){
        isDuplicate = true;
      }
    }
    !isDuplicate ? setPlayList((prev) => [...prev, newTrack[0]]) : renderDuplicateAlert();
  }

  //handle duplicate alert element, timeout after 3 secs, doesnt stack
  const duplicateAlert = <p className={styles.duplicateAlert}>This track is already in your playlist!</p>;
  let alertActive = false;
  const renderDuplicateAlert = () => {
    if(!alertActive){
      alertActive = true;
      setDuplicateTrack(true);
      setTimeout(()=>{
        setDuplicateTrack(false);
        alertActive = false;
      }, 3000);
    }
  }

  //Logic to remove tracks from play list
  const removePlayListTrack = (track) => {
    const newTracks = playList.filter((item) => item.id !== track.id);
    setPlayList(newTracks);
  }

  //PLAYLIST NAME
  const [name, setName] = useState('Playlist');

  return (
    <div>
      {duplicateTrack && duplicateAlert}
      {window.sessionStorage.getItem("authorized") ?
        <div className={styles.app}>
          <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch} />
          <SearchResults currentSearch={currentSearch} validTracks={validTracks} addPlayListTrack={addPlayListTrack} />
          <Playlist removePlayListTrack={removePlayListTrack} playList={playList} setName={setName} name={name} />
        </div>
        :
        <div>
          <Authorization />
        </div>
      }
    </div>
  );
}

export default App;
