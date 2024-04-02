const authFlow = () => {

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

export default authFlow;