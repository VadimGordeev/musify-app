import { useParams } from 'react-router-dom';

import styles from './PlaylistPage.module.scss';
import { useGetPlaylistTracksQuery } from '../../store/playlists/playlistTracks.api';

export const PlaylistPage = () => {
  const { id } = useParams<'id'>();

  const { data } = useGetPlaylistTracksQuery({ id: id || '' });

  return (
    <div className={styles.container}>
      <div className={styles.playlist_info}>{JSON.stringify(data)}</div>
    </div>
  );
};
