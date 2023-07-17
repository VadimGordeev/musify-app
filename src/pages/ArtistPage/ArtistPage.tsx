import { useParams } from 'react-router-dom';

import styles from './ArtistPage.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import { Card } from '../../shared/ui/Card/Card';
import { Loader } from '../../shared/ui/Loader/Loader';
import { TrackItem } from '../../shared/ui/Track/Track';
import {
  useCheckIsUserFollowArtistQuery,
  useFollowArtistMutation,
  useGetArtistAlbumsQuery,
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
  useGetRelatedArtistsQuery,
  useUnfollowArtistMutation
} from '../../store/api/artist/artist.api';
import { useAppSelector } from '../../store/store.types';
import { selectUser } from '../../store/user/user.selector';

export const ArtistPage = () => {
  const { id } = useParams<'id'>();
  const user = useAppSelector(selectUser);

  const { data: artistData } = useGetArtistQuery({ id: id || '' });
  const { data: topTracksData } = useGetArtistTopTracksQuery({
    id: id || '',
    market: user?.country || ''
  });
  const { data: albumsData } = useGetArtistAlbumsQuery({ id: id || '' });
  const { data: relatedArtistsData } = useGetRelatedArtistsQuery({
    id: id || ''
  });
  const { data: isFollow } = useCheckIsUserFollowArtistQuery({ ids: id || '' });

  const [followArtist] = useFollowArtistMutation();
  const [unfollowArtist] = useUnfollowArtistMutation();
  return artistData && topTracksData && albumsData && relatedArtistsData ? (
    <div className={styles.container}>
      <div className={styles.artist_info}>
        <img
          className={styles.cover}
          src={artistData.images[0].url}
        />
        <div className={styles.text_info}>
          <div className={styles.btn_container}>
            {isFollow && (
              <Button
                onClick={() =>
                  isFollow[0]
                    ? void unfollowArtist({ ids: id || '' })
                    : void followArtist({ ids: id || '' })
                }
              >
                {isFollow[0] ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
          <h1 className={styles.name}>{artistData.name}</h1>
          <span className={styles.followers}>
            {artistData.followers.total} followers
          </span>
        </div>
      </div>
      <div className={styles.top_tracks}>
        <h3>Top Tracks</h3>
        {topTracksData.tracks.map((item, index) => {
          return (
            <TrackItem
              key={item.id}
              item={item}
              index={index}
            />
          );
        })}
      </div>
      <div className={styles.albums}>
        <h3>Albums</h3>
        <div className={styles.items}>
          {albumsData.items.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.artists}>
        <h3>Related Artists</h3>
        <div className={styles.items}>
          {relatedArtistsData.artists.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
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
