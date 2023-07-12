import styles from './MainPage.module.scss';
import { Card } from '../../shared/ui/Card/Card';
import { Loader } from '../../shared/ui/Loader/Loader';
import { useGetNewReleasesQuery } from '../../store/api/browse/browse.api';
import { useGetUserRecommendationQuery } from '../../store/api/user/user.api';

export const MainPage = () => {
  const { data: recommendationData } = useGetUserRecommendationQuery();
  const { data: newReleasesData } = useGetNewReleasesQuery();

  return recommendationData && newReleasesData ? (
    <div className={styles.container}>
      <h1>Albums for You</h1>
      <div className={styles.card_container}>
        {recommendationData.tracks.map((item) => {
          return (
            <Card
              key={item.id}
              item={item.album}
              artist={item.artists[0].name}
            />
          );
        })}
      </div>
      <h1>Discover New Releases</h1>
      <div className={styles.card_container}>
        {newReleasesData.albums.items.map((item) => {
          return (
            <Card
              key={item.id}
              item={item}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Loader />
  );
};
