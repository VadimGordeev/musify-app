import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';

import styles from './Playlists.module.scss';
import { type Playlist } from '../../../../entities/spotifyTypes';
import { MenuState } from '../../../../store/menu/menu.constants';
import { menuActions } from '../../../../store/menu/menu.slice';
import { useAppDispatch } from '../../../../store/store.types';

export const PlaylistsCard = ({ card }: { card: Playlist }) => {
  const dispatch = useAppDispatch();

  return (
    <NavLink
      to={`/playlist/${card.id}`}
      className={({ isActive }) =>
        classNames({ [styles.active]: isActive, [styles.link]: true })
      }
      onClick={() => dispatch(menuActions.changeState(MenuState.Close))}
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
