import { type Tracks } from '../../entities/spotifyTypes';
import { baseApi } from '../api';

export const playlistsTracksApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaylistTracks: build.query<Tracks, { id: string }>({
      query: ({ id }) => ({
        url: `playlists/${id}/tracks`
      })
    })
  })
});

export const { useGetPlaylistTracksQuery } = playlistsTracksApi;
