import { baseApi } from '..';
import { type Device } from '../../../entities/spotifyTypes';

interface DevicesResponse {
  devices: [Device];
}
interface PlayPayload {
  id: string;
  uris: string;
}

export const playerApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getDevices: build.query<DevicesResponse, void>({
      query: () => ({
        url: '/me/player/devices'
      })
    }),
    startPlay: build.mutation<void, PlayPayload>({
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
    })
  })
});

export const { useGetDevicesQuery, useStartPlayMutation } = playerApi;
