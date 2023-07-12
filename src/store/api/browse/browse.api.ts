import { baseApi } from '..';
import { type Category, type Album } from '../../../entities/spotifyTypes';

interface NewReleasesResponse {
  albums: { items: [Album] };
}
interface CategoryResponse {
  categories: { items: [Category] };
}

export const browseApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getNewReleases: build.query<NewReleasesResponse, void>({
      query: () => ({
        url: 'browse/new-releases'
      })
    }),
    getCategories: build.query<CategoryResponse, void>({
      query: () => ({
        url: `browse/categories`
      })
    })
  })
});

export const { useGetNewReleasesQuery, useGetCategoriesQuery } = browseApi;
