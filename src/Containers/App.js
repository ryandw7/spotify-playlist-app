import React, { useEffect, useState } from 'react';
import Playlist from '../Playlist.js';
import SearchBar from '../SearchBar.js';
import SearchResults from '../SearchResults.js';
import styles from '../App.module.css';
import data from '../testTracks.json';
import authFlow from '../calls.js';
import axios from 'axios';
function App() {
  //Check authorization status
  const [auth, setAuth] = useState(false);
  const testTracks = data;
  //Recieve search value from search bar after submit is pressed;
  const [currentSearch, setCurrentSearch] = useState('');
  const newSearch = (value) => {
    setCurrentSearch(value);
   // fetch(authFlow()).then((res)=>res.json()).then((data)=>console.log(data))
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


  //condense url from calls.js to be used on auth anchor
  const url = authFlow();


 const test = () => {
  const hash = window.location.hash;
  let token = window.localStorage.getItem("token");
  console.log(hash)
  console.log(authFlow())
 
 }

 //store access token for api calls
 const [token, setToken] = useState('');
 useEffect(()=>{
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")

  if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = "";
      window.localStorage.setItem("token", token);
  }

  setToken(token);
  setAuth(true)
  console.log(token)
 }, [])


const [artists, setArtists] = useState([])

 const searchArtists = async (e) => {
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: currentSearch,
          type: "track"
      }
  })
  console.log(data.tracks.items)
  //setArtists(data.artists.items);
  //console.log(artists);

 
}

useEffect(()=>{
  searchArtists();
}, [currentSearch])
  return (
    <div>
    {auth === true ?
    <div className={styles.app}>
      <SearchBar className={styles.searchBar} newSearch={newSearch} currentSearch={currentSearch} />
      <SearchResults currentSearch={currentSearch} validTracks={validTracks} addPlayListTrack={addPlayListTrack}/>
      <Playlist removePlayListTrack={removePlayListTrack} playList={playList} setName={setName} name={name}/>
    </div>
    :
    <div>
    <button onClick={test}>Sign in With Spotify</button>
    <a href={url}>Link Spot </a>
    </div>
   }
   </div>
  );
}

export default App;
