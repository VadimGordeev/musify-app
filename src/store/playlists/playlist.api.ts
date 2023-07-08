import { type Playlist } from '../../entities/spotifyTypes';
import { baseApi } from '../api';

export const playlistApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaylist: build.query<Playlist, { id: string }>({
      query: ({ id }) => ({
        url: `playlists/${id}`
      })
    })
  })
});

export const { useGetPlaylistQuery } = playlistApi;
