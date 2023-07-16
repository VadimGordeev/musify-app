import axios, { type AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';

import { SPOTIFY_URL } from './constant';
import { authSpotify } from './login';

export const instance = axios.create({
  baseURL: `${SPOTIFY_URL}`
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('spotify/access-token');
  if (!accessToken) {
    throw new Error('Unauthorized');
  }
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
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
