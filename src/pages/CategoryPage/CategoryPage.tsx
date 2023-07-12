import { useParams } from 'react-router-dom';

import styles from './CategoryPage.module.scss';
import { Card } from '../../features/MainSection/Card/Card';
import {
  useGetCategoryPlaylistsQuery,
  useGetCategoryQuery
} from '../../store/api/browse/browse.api';

export const CategoryPage = () => {
  const { id } = useParams<'id'>();

  const { data: categoryData } = useGetCategoryQuery({ id: id || '' });
  const { data: categoryPlaylistsData } = useGetCategoryPlaylistsQuery({
    id: id || ''
  });

  return (
    <div className={styles.container}>
      {categoryData && <h1>{categoryData.name}</h1>}
      <div className={styles.playlists}>
        {categoryPlaylistsData &&
          categoryPlaylistsData.playlists.items.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
              />
            );
          })}
      </div>
    </div>
  );
};
