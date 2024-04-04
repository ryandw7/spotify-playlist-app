export default async function fetchResults(requirement, accessToken, callBack){
    if (requirement) {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${requirement}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      )
      const data = await res.json();
      callBack(data.tracks.items);
    }
    
  }