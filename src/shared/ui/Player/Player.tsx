import { useState } from 'react';

import { ReactComponent as PlayIcon } from '~/assets/icons//btn/play.svg';
import { ReactComponent as DeviceIcon } from '~/assets/icons/btn/airplay.svg';
import { ReactComponent as BackIcon } from '~/assets/icons/btn/back.svg';
import { ReactComponent as ForwardIcon } from '~/assets/icons/btn/forward.svg';
import { ReactComponent as PauseIcon } from '~/assets/icons/btn/pause.svg';
import { ReactComponent as VolumeIcon } from '~/assets/icons/volume.svg';

import styles from './Player.module.scss';
import {
  useGetPlaybackStateQuery,
  usePauseMutation,
  useStartPlayMutation
} from '../../../store/api/player/player.api';
import { Button } from '../Button/Button';

export const Player = () => {
  const [time, setTime] = useState('');
  const [volume, setVolume] = useState('');

  const { data: playbackState } = useGetPlaybackStateQuery();
  const [startPlay] = useStartPlayMutation();
  const [pause] = usePauseMutation();

  return (
    <div className={styles.container}>
      <div className={styles.empty}></div>
      <div className={styles.player}>
        <div className={styles.playerbtn}>
          <Button
            icon={<BackIcon />}
            appearance="secondary"
            className={styles.previous}
          />
          <Button
            icon={playbackState?.is_playing ? <PauseIcon /> : <PlayIcon />}
            appearance="secondary"
            className={styles.play}
            onClick={() =>
              playbackState?.is_playing
                ? void pause({ id: '4b037c47db1195d4fa086a41aa7ebd38d718df2e' })
                : void startPlay({
                    id: '4b037c47db1195d4fa086a41aa7ebd38d718df2e',
                    uris: playbackState?.item.uri
                  })
            }
          />
          <Button
            icon={<ForwardIcon />}
            appearance="secondary"
            className={styles.next}
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
      </div>
    </div>
  );
};
