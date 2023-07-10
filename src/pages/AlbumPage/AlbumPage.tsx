import { NavLink, useParams } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';
import { ReactComponent as DurationIcon } from '~/assets/icons/duration.svg';

import styles from './AlbumPage.module.scss';
import { TrackItem } from '../../features/MainSection/Track/Track';
import { Loader } from '../../shared/ui/Loader/Loader';
import { useGetAlbumQuery } from '../../store/api/album/album.api';

export const AlbumPage = () => {
  const { id } = useParams<'id'>();

  const { data } = useGetAlbumQuery({ id: id || '' });

  return data ? (
    <div className={styles.container}>
      <div className={styles.playlist_info}>
        {data.images.length > 0 ? (
          <img
            className={styles.cover}
            src={data.images[0].url}
          />
        ) : (
          <Cover className={styles.cover} />
        )}
        <div className={styles.text_info}>
          <p className={styles.type}>{data.album_type}</p>
          <p className={styles.name}>{data.name}</p>
          <div className={styles.statistics}>
            <NavLink
              to={`/artist/${data.artists[0].id}`}
              className={styles.artist}
            >
              {data.artists[0].name}
            </NavLink>
            <p className={styles.tracks_quantity}>
              {data.tracks.items.length} tracks
            </p>
          </div>
        </div>
      </div>
      <div className={styles.tracklist}>
        <div className={styles.header}>
          <span className={styles.index}>#</span>
          <span className={styles.title}>Title</span>
          <span className={styles.duration}>
            <DurationIcon />
          </span>
        </div>
        <div className={styles.items}>
          {data.tracks.items.map((item, index) => {
            return (
              <TrackItem
                key={item.id}
                item={item}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
