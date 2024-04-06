export const retrieveUser = async () => {
        
    try {
        const res = await fetch('https://api.spotify.com/v1/me?access_token=' + window.sessionStorage.getItem("token"))
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(`ERROR: ${err}, Unable to retrieve ID`);
    }
}