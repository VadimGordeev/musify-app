import { BASE_URL, CLIENT_ID } from './constant';

export const authSpotify = (): void => {
  const config = {
    client_id: `${CLIENT_ID}`,
    redirect_uri: `${BASE_URL}/auth`,
    authorize_url: `https://accounts.spotify.com/authorize`,
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-modify-private',
      'playlist-read-private',
      'user-top-read',
      'user-library-read',
      'user-read-recently-played',
      'playlist-modify-public',
      'ugc-image-upload',
      'user-follow-read',
      'user-follow-modify',
      'user-read-playback-state',
      'user-modify-playback-state',
      'streaming'
    ]
  };
  const encodedScope = config.scope.join(' ').replace(' ', '%20');
  const redirectUrl = `${config.authorize_url}?client_id=${config.client_id}&response_type=token&redirect_uri=${config.redirect_uri}&scope=${encodedScope}`;

  window.location.replace(redirectUrl);
};
