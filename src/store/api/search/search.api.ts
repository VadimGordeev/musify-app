import { baseApi } from '..';
import {
  type Artist,
  type Album,
  type Playlist,
  type Track
} from '../../../entities/spotifyTypes';

export interface SearchResponse {
  albums: { items: [Album] };
  artists: { items: [Artist] };
  playlists: { items: [Playlist] };
  tracks: { items: [Track] };
}

export const searchApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getSearchResponse: build.query<SearchResponse, { query: string }>({
      query: ({ query }) => ({
        url: `search?q=${query}&type=artist%2Cplaylist%2Ctrack%2Calbum`
      })
    })
  })
});

export const { useGetSearchResponseQuery } = searchApi;
