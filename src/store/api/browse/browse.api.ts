import { baseApi } from '..';
import { type Album } from '../../../entities/spotifyTypes';

interface NewReleasesResponse {
  albums: { items: [Album] };
}

export const browseApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getNewReleases: build.query<NewReleasesResponse, void>({
      query: () => ({
        url: 'browse/new-releases'
      })
    })
  })
});

export const { useGetNewReleasesQuery } = browseApi;
