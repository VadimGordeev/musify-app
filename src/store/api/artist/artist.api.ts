import { baseApi } from '..';
import {
  type Track,
  type Artist,
  type Album
} from '../../../entities/spotifyTypes';

interface TopTracksResponse {
  tracks: [Track];
}
interface AlbumsResponse {
  items: [Album];
}
interface RelatedArtistsResponse {
  artists: [Artist];
}

export const artistApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getArtist: build.query<Artist, { id: string }>({
      query: ({ id }) => ({
        url: `artists/${id}`
      })
    }),
    getArtistTopTracks: build.query<
      TopTracksResponse,
      { id: string; market: string }
    >({
      query: ({ id, market }) => ({
        url: `artists/${id}/top-tracks`,
        params: {
          market: market
        }
      })
    }),
    getArtistAlbums: build.query<AlbumsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `artists/${id}/albums`
      })
    }),
    getRelatedArtists: build.query<RelatedArtistsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `artists/${id}/related-artists`
      })
    })
  })
});

export const {
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
  useGetArtistAlbumsQuery,
  useGetRelatedArtistsQuery
} = artistApi;
