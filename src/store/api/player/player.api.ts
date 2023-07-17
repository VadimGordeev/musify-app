import { baseApi } from '..';
import {
  type PlaybackState,
  type Device
} from '../../../entities/spotifyTypes';

interface DevicesResponse {
  devices: [Device];
}
interface PlayPayload {
  id?: string;
  uris?: string;
}

export const playerApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getPlaybackState: build.query<PlaybackState, void>({
      providesTags: [{ type: 'PLAYER', id: 'PLAYER' }],
      query: () => ({
        url: '/me/player'
      })
    }),
    getDevices: build.query<DevicesResponse, void>({
      query: () => ({
        url: '/me/player/devices'
      })
    }),
    startPlay: build.mutation<void, PlayPayload>({
      invalidatesTags: [{ type: 'PLAYER', id: 'PLAYER' }],
      query: ({ id, uris }) => ({
        url: '/me/player/play',
        method: 'PUT',
        params: {
          device_id: id
        },
        body: {
          uris: [uris]
        }
      })
    }),
    pause: build.mutation<void, { id?: string }>({
      invalidatesTags: [{ type: 'PLAYER', id: 'PLAYER' }],
      query: ({ id }) => ({
        url: '/me/player/pause',
        method: 'PUT',
        params: {
          device_id: id
        }
      })
    }),
    skipToNext: build.mutation<void, { id?: string }>({
      invalidatesTags: [{ type: 'PLAYER', id: 'PLAYER' }],
      query: ({ id }) => ({
        url: '/me/player/next',
        method: 'POST',
        params: {
          device_id: id
        }
      })
    }),
    skipToPrevious: build.mutation<void, { id?: string }>({
      invalidatesTags: [{ type: 'PLAYER', id: 'PLAYER' }],
      query: ({ id }) => ({
        url: '/me/player/previous',
        method: 'POST',
        params: {
          device_id: id
        }
      })
    })
  })
});

export const {
  useGetDevicesQuery,
  useStartPlayMutation,
  useGetPlaybackStateQuery,
  usePauseMutation,
  useSkipToNextMutation,
  useSkipToPreviousMutation
} = playerApi;
