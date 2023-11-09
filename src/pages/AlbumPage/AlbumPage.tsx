import { getYear } from 'date-fns';
import { NavLink, useParams } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';
import { ReactComponent as DurationIcon } from '~/assets/icons/duration.svg';
import { ReactComponent as PlayIcon } from '~/assets/icons/play.svg';

import styles from './AlbumPage.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import { Loader } from '../../shared/ui/Loader/Loader';
import { TrackItem } from '../../shared/ui/Track/Track';
import { useGetAlbumQuery } from '../../store/api/album/album.api';
import { useStartPlayAlbumMutation } from '../../store/api/player/player.api';
import { useAppSelector } from '../../store/store.types';
import { activeDevice } from '../../store/user/user.selector';

export const AlbumPage = () => {
  const { id } = useParams<'id'>();

  const { data } = useGetAlbumQuery({ id: id || '' });

  const [startPlay] = useStartPlayAlbumMutation();

  const deviceId = useAppSelector(activeDevice);

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
          <div className={styles.btn_container}>
            <Button
              icon={<PlayIcon />}
              className={styles.play}
              onClick={() =>
                void startPlay({ id: deviceId, context_uri: data.uri })
              }
            />
          </div>
          <p className={styles.type}>{data.album_type}</p>
          <p className={styles.name}>{data.name}</p>
          <div className={styles.statistics}>
            <NavLink
              to={`/artist/${data.artists[0].id}`}
              className={styles.artist}
            >
              {data.artists[0].name}
            </NavLink>
            <p className={styles.date}>
              {getYear(new Date(data.release_date))}
            </p>
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
                contextUri={data.uri}
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
