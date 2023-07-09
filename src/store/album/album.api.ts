import { type Album } from '../../entities/spotifyTypes';
import { baseApi } from '../api';

export const albumApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getAlbum: build.query<Album, { id: string }>({
      query: ({ id }) => ({
        url: `albums/${id}`
      })
    })
  })
});

export const { useGetAlbumQuery } = albumApi;
