import { type Playlist } from '../../entities/spotifyTypes';
import { baseApi } from '../api';

export interface PlaylistResponse {
  items: [Playlist];
}

export const playlistsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}/playlists`
      })
    })
  })
});

export const { useGetPlaylistsQuery } = playlistsApi;
