import axios from 'axios';

export const requestGoogleUserData = (acessToken: string) => {
  return axios({
    url: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${acessToken}`,
  });
};
