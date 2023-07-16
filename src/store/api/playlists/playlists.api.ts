import { baseApi } from '..';
import { type Playlist } from '../../../entities/spotifyTypes';

interface PlaylistResponse {
  items: [Playlist];
  total: number;
}

interface EditPlaylistTextPayload {
  name: string;
  description: string;
}

export const playlistsApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaylist: build.query<Playlist, { id: string }>({
      providesTags: [{ type: 'PLAYLIST', id: 'PLAYLIST' }],
      query: ({ id }) => ({
        url: `playlists/${id}`
      })
    }),
    editPlaylistText: build.mutation<
      { EditPlaylistResponse: string },
      { id: string; payload: EditPlaylistTextPayload }
    >({
      query: ({ id, payload }) => ({
        url: `playlists/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: [
        { type: 'PLAYLIST', id: 'PLAYLIST' },
        { type: 'PLAYLISTS', id: 'PLAYLISTS' }
      ]
    }),
    editPlaylistImage: build.mutation<
      { EditPlaylistResponse: string },
      { id: string; image: string }
    >({
      query: ({ id, image }) => ({
        url: `playlists/${id}/images`,
        method: 'PUT',
        headers: {
          'content-type': 'image/jpeg'
        },
        body: image
      }),
      invalidatesTags: [
        { type: 'PLAYLIST', id: 'PLAYLIST' },
        { type: 'PLAYLISTS', id: 'PLAYLISTS' }
      ]
    }),
    createPlaylist: build.mutation<{ name: string }, { id: string }>({
      invalidatesTags: [{ type: 'PLAYLISTS', id: 'PLAYLISTS' }],
      query: ({ id }) => ({
        url: `/users/${id}/playlists`,
        method: 'POST',
        body: { name: 'New Playlist' }
      })
    }),
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Api requires
    followPlaylist: build.mutation<{ public: boolean }, { id: string }>({
      invalidatesTags: [
        { type: 'PLAYLIST', id: 'PLAYLIST' },
        { type: 'PLAYLISTS', id: 'PLAYLISTS' }
      ],
      query: ({ id }) => ({
        url: `playlists/${id}/followers`,
        method: 'PUT',
        body: { public: true }
      })
    }),
    unfollowPlaylist: build.mutation<{ isSuccess: boolean }, { id: string }>({
      invalidatesTags: [
        { type: 'PLAYLIST', id: 'PLAYLIST' },
        { type: 'PLAYLISTS', id: 'PLAYLISTS' }
      ],
      query: ({ id }) => ({
        url: `playlists/${id}/followers`,
        method: 'DELETE'
      })
    }),
    getPlaylists: build.query<PlaylistResponse, { id: string; limit?: number }>(
      {
        providesTags: [{ type: 'PLAYLISTS', id: 'PLAYLISTS' }],
        query: ({ id, limit }) => ({
          url: `/users/${id}/playlists`,
          params: {
            limit: limit ?? 20
          }
        })
      }
    )
  })
});

export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useEditPlaylistTextMutation,
  useEditPlaylistImageMutation,
  useCreatePlaylistMutation,
  useFollowPlaylistMutation,
  useUnfollowPlaylistMutation
} = playlistsApi;
