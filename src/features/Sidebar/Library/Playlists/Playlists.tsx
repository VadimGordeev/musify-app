import { NavLink } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Playlists.module.scss';
import { type Playlist } from '../../../../entities/spotifyTypes';

export const PlaylistsCard = ({ card }: { card: Playlist }) => {
  return (
    <NavLink
      to={`/playlist/${card.id}`}
      className={styles.container}
    >
      {card.images.length > 0 ? (
        <img
          className={styles.cover}
          src={card.images[0].url}
        />
      ) : (
        <Cover className={styles.cover} />
      )}
      <div>
        <p className={styles.name}>{card.name}</p>
      </div>
    </NavLink>
  );
};
