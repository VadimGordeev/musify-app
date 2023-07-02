import { type RootState } from '../store.types';

export const selectPlaylists = (state: RootState) => state.playlists.playlists;
