import { baseApi } from '..';
import {
  type Playlist,
  type Album,
  type Track
} from '../../../entities/spotifyTypes';

interface RecommendationResponse {
  tracks: [Track];
}

interface SavedAlbumsResponse {
  items: [{ album: Album }];
}

interface UserPlaylistsResponse {
  items: [Playlist];
}

interface RecentlyPlayedTracks {
  items: [{ track: Track }];
}

export const userApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getUserRecommendation: build.query<RecommendationResponse, void>({
      query: () => ({
        url: 'recommendations',
        params: {
          seed_artists: '2ye2Wgw4gimLv2eAKyk1NB',
          seed_genres: 'metal',
          seed_tracks: '5sICkBXVmaCQk5aISGR3x1'
        }
      })
    }),
    getUserSavedAlbums: build.query<SavedAlbumsResponse, void>({
      query: () => ({
        url: 'me/albums'
      })
    }),
    getUserPlaylists: build.query<UserPlaylistsResponse, void>({
      query: () => ({
        url: 'me/playlists',
        params: {
          limit: 50
        }
      })
    }),
    getRecentlyPlayedTracks: build.query<RecentlyPlayedTracks, void>({
      query: () => ({
        url: 'me/player/recently-played'
      })
    })
  })
});

export const {
  useGetUserRecommendationQuery,
  useGetUserSavedAlbumsQuery,
  useGetUserPlaylistsQuery,
  useGetRecentlyPlayedTracksQuery
} = userApi;
