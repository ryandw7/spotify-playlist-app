const authFlow = () => {


  function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const CLIENT_ID = 'e191ea5f28f7459eb45d6e9d24eb552f';
const REDIRECT_URI = "https://congenial-succotash-jxwv5qq4w9pfq7gw-3000.app.github.dev/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
  
 let url = '';
  url += AUTH_ENDPOINT;
  url += '?client_id=' + CLIENT_ID;
  url += '&redirect_uri=' + REDIRECT_URI;
 url += '&response_type=' + RESPONSE_TYPE;
  
 

   return url;
}





const APIController =(function(){
  const clientId = 'e191ea5f28f7459eb45d6e9d24eb552f';
  const clientSecret = '9a532a36262c45c5b1407103fd731d22';

  //private methods
  const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
     method: 'POST',
     headers: {
      'Content-Type' : 'application/x-ww-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
     },
     body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    console.log(data)
    return data.access_token;
  }
  console.log(_getToken())
})

export default authFlow;