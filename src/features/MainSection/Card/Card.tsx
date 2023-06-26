import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Card.module.scss';

export const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Cover className={styles.cover} />
        <p className={styles.name}>Playlist</p>
        <p className={styles.description}>Playlist description!!!</p>
      </div>
    </div>
  );
};
