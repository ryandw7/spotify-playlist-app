const authFlow = () => {
  var client_id = 'e191ea5f28f7459eb45d6e9d24eb552f';
  var redirect_uri = 'http://localhost:8888/callback';
  

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

  
  var state = generateRandomString(16);
  
  localStorage.setItem('stateKey', state);
  var scope = 'user-read-private user-read-email';
  
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);
  console.log(url)
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