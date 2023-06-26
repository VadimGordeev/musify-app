import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Playlists.module.scss';

export const Playlists = () => {
  return (
    <div className={styles.container}>
      <Cover className={styles.cover} />
      <div>
        <p className={styles.name}>My Playlist</p>
        <p>Playlist &#x2022; Spotify</p>
      </div>
    </div>
  );
};
