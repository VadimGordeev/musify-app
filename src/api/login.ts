import axios, { AxiosHeaders } from 'axios';
import { UserProfile } from '../entities/spotifyTypes';
import { BASE_URL, CLIENT_ID } from './constant';

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
  localStorage.setItem(
    'access_token',
    'BQBhwdVV5nvy6MxnweHHKfpK5mg3f67PdQ9oggvqxaBwyJsMfBr3ZbLNEL-TPvtzLF0sIPsDXbhNHSHi19PFjpyRBWjli5bhHJI9jtZ_liuMM9sKvhEp0M9aX0WMBP5HrfJfMBiSgCnUuiCG4QHOGlIzFqr16Zg-EBQY_xb-mEQxhZDFwDjWwiW9ExHSAKLi5ROCCv46RB8Db5SiskBC82vPG1KkI5C65KqICBz9DeqRhgQEexvp5kxFUJHARiSP'
  );
};

export const getUser = async (): Promise<UserProfile> => {
  const accessToken =
    'BQBhwdVV5nvy6MxnweHHKfpK5mg3f67PdQ9oggvqxaBwyJsMfBr3ZbLNEL-TPvtzLF0sIPsDXbhNHSHi19PFjpyRBWjli5bhHJI9jtZ_liuMM9sKvhEp0M9aX0WMBP5HrfJfMBiSgCnUuiCG4QHOGlIzFqr16Zg-EBQY_xb-mEQxhZDFwDjWwiW9ExHSAKLi5ROCCv46RB8Db5SiskBC82vPG1KkI5C65KqICBz9DeqRhgQEexvp5kxFUJHARiSP';
  if (!accessToken) {
    throw new Error('Unauthorized');
  }

  const headers = new AxiosHeaders();

  headers.set('Authorization', `Bearer ${accessToken}`);
  const { data } = await axios.get<UserProfile>(
    'https://api.spotify.com/v1/me/',
    {
      headers
    }
  );
  console.log(data);
  return data;
};
