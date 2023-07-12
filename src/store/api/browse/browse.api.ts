import { baseApi } from '..';
import {
  type Category,
  type Album,
  type Playlist
} from '../../../entities/spotifyTypes';

interface NewReleasesResponse {
  albums: { items: [Album] };
}
interface CategoryResponse {
  categories: { items: [Category] };
}
interface CategoryPlaylistsResponse {
  playlists: { items: [Playlist] };
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
    }),
    getCategory: build.query<Category, { id: string }>({
      query: ({ id }) => ({
        url: `browse/categories/${id}`
      })
    }),
    getCategoryPlaylists: build.query<
      CategoryPlaylistsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `browse/categories/${id}/playlists`
      })
    })
  })
});

export const {
  useGetNewReleasesQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryPlaylistsQuery
} = browseApi;
