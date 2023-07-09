import { type Playlist } from '../../entities/spotifyTypes';
import { baseApi } from '../api';

export interface PlaylistResponse {
  items: [Playlist];
}

export const playlistsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaylists: build.query<PlaylistResponse, { id: string; limit?: number }>(
      {
        query: ({ id, limit }) => ({
          url: `/users/${id}/playlists`,
          params: {
            limit: limit ?? 20
          }
        }),
        merge: (currentCache, newItems) => {
          currentCache.items.push(...newItems.items);
        }
      }
    )
  })
});

export const { useGetPlaylistsQuery } = playlistsApi;
