import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LibraryIcon } from '~/assets/icons/library.svg';
import { ReactComponent as PlusIcon } from '~/assets/icons/plus.svg';

import { PlaylistsCard } from './Playlists/Playlists';
import styles from './PlaylistsBar.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { Loader } from '../../../shared/ui/Loader/Loader';
import {
  useCreatePlaylistMutation,
  useGetPlaylistsQuery
} from '../../../store/api/playlists/playlists.api';
import { MenuState } from '../../../store/menu/menu.constants';
import { menuActions } from '../../../store/menu/menu.slice';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';
import { userId } from '../../../store/user/user.selector';

export const PlaylistsBar = () => {
  const [limit, setLimit] = useState(20);
  const id = useAppSelector(userId);
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetPlaylistsQuery({ id, limit });

  const [createPlaylist] = useCreatePlaylistMutation();

  useEffect(() => {
    const bar = document.querySelector('#bar');
    if (bar) {
      const onScroll = () => {
        const isScrolledToBottom =
          bar.scrollTop >=
          Number.parseInt(window.getComputedStyle(bar, null).height);

        if (isScrolledToBottom && !isFetching && data && limit < data.total) {
          const newLimit = data.total - limit;
          if (newLimit < limit) {
            setLimit(data.items.length + newLimit);
          } else {
            setLimit(data.items.length + limit);
          }
        }
      };

      bar.addEventListener('scroll', onScroll);

      return function () {
        bar.removeEventListener('scroll', onScroll);
      };
    }
  }, [limit, isFetching, data]);

  return (
    <div
      className={styles.container}
      id="bar"
    >
      <div className={styles.navigation}>
        <NavLink
          className={({ isActive }) =>
            classNames({ [styles.active]: isActive, [styles.link]: true })
          }
          to={'/library'}
          onClick={() => dispatch(menuActions.changeState(MenuState.Close))}
        >
          <LibraryIcon />
          Your Library
        </NavLink>
        <Button
          icon={<PlusIcon />}
          appearance="secondary"
          onClick={() => void createPlaylist({ id })}
        />
      </div>
      <div className={styles.playlists_container}>
        {data ? (
          [...data.items].map((card) => {
            return (
              <PlaylistsCard
                key={card.id}
                card={card}
              />
            );
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
