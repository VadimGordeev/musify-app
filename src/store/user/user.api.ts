import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

import { type UserProfile } from '../../entities/spotifyTypes';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async function (_, thunkAPI) {
    const accessToken = localStorage.getItem('spotify/access-token');

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const headers = new AxiosHeaders();

    headers.set('Authorization', `Bearer ${accessToken}`);
    const { data } = await axios.get<UserProfile>(
      'https://api.spotify.com/v1/me/',
      {
        headers,
        signal: thunkAPI.signal
      }
    );
    return data;
  }
);
