import { baseApi } from '..';
import { type Playlist } from '../../../entities/spotifyTypes';

interface PlaylistResponse {
  items: [Playlist];
  total: number;
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
