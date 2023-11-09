import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '../../api/instance';
import { type UserProfile } from '../../entities/spotifyTypes';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async function (_, thunkAPI) {
    const accessToken = localStorage.getItem('spotify/access-token');

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const { data } = await instance.get<UserProfile>(`/me`, {
      signal: thunkAPI.signal
    });
    return data;
  }
);
