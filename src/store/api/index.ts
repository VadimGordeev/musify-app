import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import { BASE_URL, SPOTIFY_URL } from '../../api/constant';
import { authSpotify } from '../../api/login';

const baseQuery = fetchBaseQuery({
  baseUrl: SPOTIFY_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('spotify/access-token');
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (argument, api, extraOptions) => {
  const result = await baseQuery(argument, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const href = window.location.href;
    const redirectPath = href.replace(`${BASE_URL}`, '');
    localStorage.setItem('href', redirectPath);
    authSpotify();
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['PLAYLIST', 'PLAYLISTS', 'ARTIST', 'PLAYER'] as const,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({})
});
