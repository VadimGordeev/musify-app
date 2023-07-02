import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders } from 'axios';

import { SPOTIFY_URL } from '../../api/constant';
import { type Playlist } from '../../entities/spotifyTypes';
import { useAppSelector } from '../store.types';
import { userId } from '../user/user.selector';

export const fetchPlaylists = createAsyncThunk(
  'playlists/fetch',
  async function (_, thunkAPI) {
    const user = useAppSelector(userId);
    const accessToken = localStorage.getItem('spotify/access-token');

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const headers = new AxiosHeaders();

    headers.set('Authorization', `Bearer ${accessToken}`);

    const { data } = await axios.get<Playlist>(
      `${SPOTIFY_URL}/users/${user}/playlists`,
      {
        headers,
        signal: thunkAPI.signal
      }
    );

    return data;
  }
);
