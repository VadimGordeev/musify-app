import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Card.module.scss';
import {
  type Artist,
  type Album,
  type Playlist
} from '../../../entities/spotifyTypes';

export const Card = ({ item }: { item: Album | Playlist | Artist }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {item.images ? (
          <img
            className={styles.cover}
            src={item.images[0].url}
          />
        ) : (
          <Cover className={styles.cover} />
        )}
        <p className={styles.name}>{item.name}</p>
        <p className={styles.type}>{item.type}</p>
      </div>
    </div>
  );
};
