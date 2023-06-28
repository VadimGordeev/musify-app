import axios, { AxiosHeaders } from 'axios';

import { BASE_URL, CLIENT_ID } from './constant';
import { UserProfile } from '../entities/spotifyTypes';

export const authSpotify = (): void => {
  const config = {
    client_id: `${CLIENT_ID}`,
    redirect_uri: `${BASE_URL}`,
    authorize_url: `https://accounts.spotify.com/authorize`,
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-modify-private',
      'playlist-read-private',
      'user-top-read'
    ]
  };
  const encodedScope = config.scope.join(' ').replace(' ', '%20');
  const redirectUrl = `${config.authorize_url}?client_id=${config.client_id}&response_type=token&redirect_uri=${config.redirect_uri}&scope=${encodedScope}`;

  window.location.replace(redirectUrl);
  const hash = window.location.hash;
  const token = hash
    .slice(1)
    .split('&')
    .find((element) => element.startsWith('access_token'))
    .split('=')[1];

  window.location.hash = '';
  window.history.pushState({}, `${BASE_URL}`);
  window.localStorage.setItem('spotify/access-token', token);
};
