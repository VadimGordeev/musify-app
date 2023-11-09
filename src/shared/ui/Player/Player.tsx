import SpotifyWebPlayer from 'react-spotify-web-playback';

import styles from './Player.module.scss';
import { type Device } from '../../../entities/spotifyTypes';
import { useGetPlaybackStateQuery } from '../../../store/api/player/player.api';
import { useAppDispatch } from '../../../store/store.types';
import { userActions } from '../../../store/user/user.slice';
import { getActiveDeviceId } from '../../utils/getActiveDeviceId';

export const Player = () => {
  const { data: playbackState } = useGetPlaybackStateQuery();

  const token = localStorage.getItem('spotify/access-token');
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <SpotifyWebPlayer
        token={token || ''}
        uris={playbackState?.item.uri || ''}
        callback={(state) => {
          dispatch(
            userActions.addDeviceId(
              getActiveDeviceId(state.devices as Device[])
            )
          );
        }}
      />
      {/* <div className={styles.empty}>
        {playbackState?.item && (
          <div className={styles.song}>
            <img src={playbackState.item.album.images[0].url} />
            <p>{playbackState.item.name}</p>
          </div>
        )}
      </div>
      <div className={styles.player}>
        <div className={styles.playerbtn}>
          <Button
            icon={<PreviousIcon />}
            appearance="secondary"
            className={styles.previous}
            onClick={() => void previous({})}
          />
          <Button
            icon={playbackState?.is_playing ? <PauseIcon /> : <PlayIcon />}
            appearance="secondary"
            className={styles.play}
            // onClick={() =>
            //   playbackState?.is_playing
            //     ? void pause({ id: '4b037c47db1195d4fa086a41aa7ebd38d718df2e' })
            //     : void startPlay({
            //         id: '4b037c47db1195d4fa086a41aa7ebd38d718df2e',
            //         uris: playbackState?.item.uri
            //       })
            // }
          />
          
          <Button
            icon={<NextIcon />}
            appearance="secondary"
            className={styles.next}
            onClick={() => void next({})}
          />
        </div>
        <div className={styles.time}>
          <span className={styles.current_time}>0:00</span>
          <input
            type="range"
            className={styles.slider_time}
            min="0"
            max="100"
            step="1"
            value={time}
            onChange={({ target: { value } }) => setTime(value)}
          ></input>
          <span className={styles.total_time}>0:00</span>
        </div>
      </div>
      <div className={styles.volume}>
        <Button
          icon={<DeviceIcon />}
          appearance="secondary"
        />
        <VolumeIcon />
        <input
          type="range"
          className={styles.slider_volume}
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={({ target: { value } }) => setVolume(value)}
        ></input>
      </div> */}
    </div>
  );
};
