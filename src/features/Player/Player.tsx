import { useState } from 'react';

import loop from '~/assets/icons/loop.png';
import next from '~/assets/icons/next_musicbar.png';
import play from '~/assets/icons/play_musicbar.png';
import previous from '~/assets/icons/previous_musicbar.png';
import shuffle from '~/assets/icons/shuffle.png';

import styles from './Player.module.scss';

export const Player = () => {
  const [time, setTime] = useState('');
  const [volume, setVolume] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.empty}></div>
      <div className={styles.player}>
        <div className={styles.playerbtn}>
          <img
            src={shuffle}
            className={styles.shuffle}
          />
          <img
            src={previous}
            className={styles.previous}
          />
          <img
            src={play}
            className={styles.play}
          />
          <img
            src={next}
            className={styles.next}
          />
          <img
            src={loop}
            className={styles.loop}
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
