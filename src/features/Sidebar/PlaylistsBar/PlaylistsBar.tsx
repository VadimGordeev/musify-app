import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LibraryIcon } from '~/assets/icons/library.svg';
import { ReactComponent as PlusIcon } from '~/assets/icons/plus.svg';

import { PlaylistsCard } from './Playlists/Playlists';
import styles from './PlaylistsBar.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useGetPlaylistsQuery } from '../../../store/api/playlists/playlists.api';
import { useAppSelector } from '../../../store/store.types';
import { userId } from '../../../store/user/user.selector';

export const PlaylistsBar = () => {
  const [limit, setLimit] = useState(20);
  const id = useAppSelector(userId);

  const { data, isFetching } = useGetPlaylistsQuery({ id, limit });

  useEffect(() => {
    const bar = document.querySelector('#bar');
    if (bar) {
      const onScroll = () => {
        const isScrolledToBottom =
          bar.scrollTop >=
          Number.parseInt(window.getComputedStyle(bar, null).height);

        if (isScrolledToBottom && !isFetching && data && limit <= data.total) {
          setLimit(data.items.length + limit);
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
        >
          <LibraryIcon />
          Your Library
        </NavLink>
        <Button icon={<PlusIcon />} />
      </div>
      <div className={styles.playlists_container}>
        {data ? (
          data.items.map((card) => {
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
