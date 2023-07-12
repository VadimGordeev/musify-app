import { useNavigate } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Card.module.scss';
import {
  type Artist,
  type Album,
  type Playlist
} from '../../../entities/spotifyTypes';

export const Card = ({
  item,
  artist
}: {
  item: Album | Playlist | Artist;
  artist?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          if (item.type === 'artist') {
            navigate(`/artist/${item.id}`);
          } else if (item.type === 'playlist') {
            navigate(`/playlist/${item.id}`);
          } else {
            navigate(`/album/${item.id}`);
          }
        }}
        className={styles.card}
      >
        {item.images.length > 0 ? (
          <img
            className={styles.cover}
            src={item.images[0].url}
          />
        ) : (
          <Cover className={styles.cover} />
        )}
        <p className={styles.name}>{item.name}</p>
        {artist ? (
          <p className={styles.name}>{artist}</p>
        ) : (
          <p className={styles.type}>{item.type}</p>
        )}
      </div>
    </div>
  );
};
