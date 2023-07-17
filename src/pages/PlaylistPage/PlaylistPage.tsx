import { useState } from 'react';

import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { ReactComponent as Cover } from '~/assets/cover.svg';
import { ReactComponent as DurationIcon } from '~/assets/icons/duration.svg';

import styles from './PlaylistPage.module.scss';
import { EditPlaylist } from '../../features/EditPlaylist/EditPlaylist';
import { Button } from '../../shared/ui/Button/Button';
import { Loader } from '../../shared/ui/Loader/Loader';
import { TrackItem } from '../../shared/ui/Track/Track';
import {
  useCheckIsUserFollowPlaylistQuery,
  useFollowPlaylistMutation,
  useGetPlaylistQuery,
  useUnfollowPlaylistMutation
} from '../../store/api/playlists/playlists.api';
import { useAppSelector } from '../../store/store.types';
import { selectUser, userId } from '../../store/user/user.selector';

export const modals = {
  disable: 'disable',
  image: 'image',
  text: 'text'
} as const;

export type ModalState = (typeof modals)[keyof typeof modals];

export const PlaylistPage = () => {
  const [modalState, setIsModalState] = useState<ModalState>(modals.disable);

  const { id } = useParams<'id'>();
  const { data } = useGetPlaylistQuery({ id: id || '' });
  const user = useAppSelector(selectUser);
  const userID = useAppSelector(userId);
  const closeModal = () => {
    setIsModalState(modals.disable);
  };
  const [followPlaylist] = useFollowPlaylistMutation();
  const [unfollowPlaylist] = useUnfollowPlaylistMutation();

  const { data: isFollow } = useCheckIsUserFollowPlaylistQuery({
    id: id || '',
    ids: userID
  });

  return data ? (
    <div className={styles.container}>
      <div className={styles.playlist_info}>
        <div
          className={`${classNames({
            [styles.cover]: true,
            [styles.user]: user?.display_name === data.owner.display_name
          })}`}
          onClick={() =>
            user?.display_name === data.owner.display_name
              ? setIsModalState(modals.image)
              : ''
          }
        >
          <p>Edit</p>
          {data.images.length > 0 ? (
            <img
              className={styles.cover}
              src={data.images[0].url}
            />
          ) : (
            <Cover className={styles.cover} />
          )}
        </div>

        <div className={styles.text_info}>
          <div className={styles.btn_container}>
            {user?.display_name === data.owner.display_name && (
              <Button onClick={() => setIsModalState(modals.text)}>Edit</Button>
            )}
            {isFollow && (
              <Button
                onClick={() =>
                  isFollow[0]
                    ? void unfollowPlaylist({ id: id || '' })
                    : void followPlaylist({ id: id || '' })
                }
              >
                {isFollow[0] ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </div>
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
      {modalState === modals.image ? (
        <EditPlaylist
          playlist={data}
          onClick={closeModal}
          state={modalState}
        />
      ) : modalState === modals.text ? (
        <EditPlaylist
          playlist={data}
          onClick={closeModal}
          state={modalState}
        />
      ) : (
        ''
      )}
    </div>
  ) : (
    <Loader />
  );
};
