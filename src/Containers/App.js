import React, { useEffect, useState } from 'react';
import Playlist from '../Playlist.js';
import SearchBar from '../SearchBar.js';
import SearchResults from '../SearchResults.js';
import styles from '../App.module.css';
import data from '../testTracks.json';
import axios from 'axios';
import Authorization from './Auth/Authorization.js'
function App() {

  //store access token for api calls
  const [token, setToken] = useState('');
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("authorized", true);
    }

    setToken(token);
    console.log(token)
  }, [])

  const searchArtists = async (e) => {
    if(currentSearch){
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: currentSearch,
        type: "track"
      }
    })
    const tracks = data.tracks.items;
    setValidTracks(tracks);
  }
  }



  //Check authorization status

  const testTracks = data;
  //Recieve search value from search bar after submit is pressed;
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
  }

  //Filter through test track and return correlated tracks
  const [validTracks, setValidTracks] = useState([]);
  //Rerender results when search is pressed 
  useEffect(() => {
 
    console.log(validTracks[0])
    //setValidTracks([]);
    //renderTracks(currentSearch);
    searchArtists();
    // eslint-disable-next-line
  }, [currentSearch])

  /* const renderTracks = (search) => {
    for (const track in testTracks) {
      if (search === testTracks[track].name || search === testTracks[track].album || search === testTracks[track].artist) {
        setValidTracks((prev) => [...prev, testTracks[track]]);
      }
    } }*/

  


  //tracks added to playlist
  const [playList, setPlayList] = useState([]);

  //Logic to add tracks to playlist
  const addPlayListTrack = (track) => {
    const newTrack = validTracks.filter((item) => item.id === track.id);
    setPlayList((prev) => [...prev, newTrack[0]]);
    console.log(playList)
  }

  //Logic to remove tracks from play list
  const removePlayListTrack = (track) => {
    const newTracks = playList.filter((item) => item.id !== track.id);
    setPlayList(newTracks);
    console.log(playList)
  }

  //PLAYLIST NAME
  const [name, setName] = useState('Playlist');


  useEffect(()=>{
   
  }, [currentSearch])
  return (
    <div>
      {window.localStorage.getItem("authorized") ?
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
