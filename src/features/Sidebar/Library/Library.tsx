import { useEffect, useState } from 'react';

import { ReactComponent as LibraryIcon } from '~/assets/icons/library.svg';
import { ReactComponent as PlusIcon } from '~/assets/icons/plus.svg';

import styles from './Library.module.scss';
import { PlaylistsCard } from './Playlists/Playlists';
import { Button } from '../../../shared/ui/Button/Button';
import { Loader } from '../../../shared/ui/Loader/Loader';
import { useGetPlaylistsQuery } from '../../../store/api/playlists/playlists.api';
import { useAppSelector } from '../../../store/store.types';
import { userId } from '../../../store/user/user.selector';

export const Library = ({ onClick }: { onClick: () => void }) => {
  const [limit, setLimit] = useState(20);
  const id = useAppSelector(userId);

  const { data, isFetching } = useGetPlaylistsQuery({ id, limit });

  useEffect(() => {
    const library = document.querySelector('#lib');
    if (library) {
      const onScroll = () => {
        const isScrolledToBottom =
          library.scrollTop >=
          Number.parseInt(window.getComputedStyle(library, null).height);

        if (isScrolledToBottom && !isFetching && data && limit <= data.total) {
          setLimit(data.items.length + limit);
        }
      };

      library.addEventListener('scroll', onScroll);

      return function () {
        library.removeEventListener('scroll', onScroll);
      };
    }
  }, [limit, isFetching, data]);

  return (
    <div
      className={styles.container}
      id="lib"
    >
      {isFetching && <Loader />}
      <div className={styles.library}>
        <Button
          className={styles.library_btn}
          icon={<LibraryIcon />}
          onClick={onClick}
        >
          Your Library
        </Button>
        <Button icon={<PlusIcon />} />
      </div>
      {data &&
        data.items.map((card) => {
          return (
            <PlaylistsCard
              key={card.id}
              card={card}
            />
          );
        })}
    </div>
  );
};
