import styles from './MainPage.module.scss';
import { Card } from '../../features/MainSection/Card/Card';
import { useGetNewReleasesQuery } from '../../store/api/browse/browse.api';
import { useGetUserRecommendationQuery } from '../../store/api/user/user.api';

export const MainPage = () => {
  const { data: recommendationData } = useGetUserRecommendationQuery();
  const { data: newReleasesData } = useGetNewReleasesQuery();

  return (
    recommendationData &&
    newReleasesData && (
      <div className={styles.container}>
        <h3>Albums for You</h3>
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
        <h3>Discover New Releases</h3>
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
    )
  );
};
