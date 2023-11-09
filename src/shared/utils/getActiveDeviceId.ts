import { type Device } from '../../entities/spotifyTypes';

export const getActiveDeviceId = (devices: Device[]) => {
  let deviceId = '';

  if (devices) {
    const activeDevice = devices.find((device) => device.is_active);
    if (activeDevice) {
      deviceId = activeDevice.id;
    } else {
      const appDevice = devices.find(
        (device) => device.name === 'Spotify Web Player'
      );
      if (appDevice) {
        deviceId = appDevice?.id;
      }
    }
  }

  return deviceId;
};
