import { useParams } from 'react-router-dom';

export const PlaylistPage = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
