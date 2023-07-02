import { useParams } from 'react-router-dom';

import { useGetPlaylistTracksQuery } from '../../store/playlists/playlistTracks.api';

export const PlaylistPage = () => {
  const { id } = useParams<'id'>();

  const { data } = useGetPlaylistTracksQuery({ id: id || '' });

  return <div>{JSON.stringify(data)}</div>;
};
