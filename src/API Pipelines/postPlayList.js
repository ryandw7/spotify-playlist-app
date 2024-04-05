const retrieveID = async () => {
        
    try {
        const res = await fetch('https://api.spotify.com/v1/me?access_token=' + window.sessionStorage.getItem("token"))
        const data = await res.json();
        const USER_ID = data.id;
        return USER_ID;
    } catch (err) {
        console.log(`ERROR: ${err}, Unable to retrieve ID`);
    }
}

const CREATEPLAYLIST = async (name) => {
    if(name === ''){
        let name = 'Playlist'
    }
    const userID = await retrieveID();
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "description": "New playlist description",
                "public": false
            }),
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();
        const PLAYLIST_ID = await data.id;
        return PLAYLIST_ID;
    } catch (err) {
        console.log(`ERROR: ${err}, Unable to POST Playlist`);
    }
}


export default async function postPlaylist(trackList, playListName){

    const playListID = await CREATEPLAYLIST(playListName);
    const url = `https://api.spotify.com/v1/playlists/${playListID}/tracks`;
    
    let playListURIs = trackList.map(track => track.uri);

    try {
        console.log(playListURIs)
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "uris": playListURIs,
                "position": 0,
            }),
            headers: {
                Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log(res.json());
    } catch (err) {
        console.log(`ERROR: ${err}: Unable to POST tracks to playlist`);
    }
}
