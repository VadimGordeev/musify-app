import { useParams } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';
import { ReactComponent as DurationIcon } from '~/assets/icons/duration.svg';

import styles from './PlaylistPage.module.scss';
import { TrackItem } from '../../features/MainSection/Track/Track';
import { useGetPlaylistQuery } from '../../store/api/playlists/playlist.api';

export const PlaylistPage = () => {
  const { id } = useParams<'id'>();

  const { data } = useGetPlaylistQuery({ id: id || '' });

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
          <p className={styles.type}>{data.type}</p>
          <p className={styles.name}>{data.name}</p>
          {data.description && (
            <p className={styles.description}>{data.description}</p>
          )}
          <div className={styles.statistics}>
            <p className={styles.owner}>{data.owner.display_name}</p>
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
          <span className={styles.album}>Album</span>
          <span className={styles.duration}>
            <DurationIcon />
          </span>
        </div>
        <div className={styles.items}>
          {data.tracks.items.map((item, index) => {
            return (
              <TrackItem
                key={item.track.id}
                item={item.track}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <p>oops, something went wrong</p>
  );
};
