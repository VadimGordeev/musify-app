import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SPOTIFY_URL } from '../../api/constant';

const accessToken = localStorage.getItem('spotify/access-token');

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SPOTIFY_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    }
  }),
  endpoints: () => ({})
});
