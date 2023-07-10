import { baseApi } from '..';
import { type Track } from '../../../entities/spotifyTypes';

interface RecommendationResponse {
  tracks: [Track];
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
    })
  })
});

export const { useGetUserRecommendationQuery } = userApi;
