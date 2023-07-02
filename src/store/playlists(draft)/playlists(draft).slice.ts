import { createSlice } from '@reduxjs/toolkit';

import { fetchPlaylists } from './playlists(draft).api';
import { type PlaylistSlice } from './playlists(draft).types';
import { STATUS } from '../../entities/status';

const getInitialState = (): PlaylistSlice => {
  return {
    playlists: { status: STATUS.IDLE }
  };
};

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: getInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.pending, (state) => {
      state.playlists = { status: STATUS.LOADING };
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.playlists = { status: STATUS.SUCCESS, data: action.payload };
    });
    builder.addCase(fetchPlaylists.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        return;
      }

      state.playlists = {
        status: STATUS.ERROR,
        error: action.error.message || 'Unexpected error'
      };
    });
  }
});
