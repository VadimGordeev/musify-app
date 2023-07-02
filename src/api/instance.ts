import axios, { type AxiosError, AxiosHeaders } from 'axios';
import { useLocation } from 'react-router-dom';

import { SPOTIFY_URL } from './constant';
import { authSpotify } from './login';

const accessToken = localStorage.getItem('spotify/access-token');

const headers = new AxiosHeaders();
if (accessToken) {
  headers.set('Authorization', `Bearer ${accessToken}`);
}

export const instance = axios.create({
  baseURL: `${SPOTIFY_URL}`,
  headers
});

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  const errorStatus = error.response?.status;
  let requestRefreshCount = 0;
  if (errorStatus === 401 && requestRefreshCount < 3) {
    localStorage.removeItem('spotify/access-token');
    requestRefreshCount += 1;
    authSpotify();
    const { hash } = useLocation();
    if (hash) {
      const token = hash
        .slice(1)
        .split('&')
        .find((element) => element.startsWith('access_token'))
        ?.split('=')[1];

      if (token) {
        localStorage.setItem('spotify/access-token', token);
      }
    }
    return error;
  }
});
