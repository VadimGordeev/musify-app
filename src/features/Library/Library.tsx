import { useState } from 'react';

import classNames from 'classnames';

import styles from './Library.module.scss';
import { Button } from '../../shared/ui/Button/Button';
import {
  useGetRecentlyPlayedTracksQuery,
  useGetUserPlaylistsQuery,
  useGetUserSavedAlbumsQuery
} from '../../store/api/user/user.api';
import { Card } from '../MainSection/Card/Card';
import { TrackItem } from '../MainSection/Track/Track';

const TAB = {
  All: 'all',
  Playlists: 'playlists',
  Albums: 'albums',
  RecentlyPlayed: 'recentlyPlayed'
} as const;

export type TabState = (typeof TAB)[keyof typeof TAB];

export const Library = () => {
  const [selectedTab, setSelectedTab] = useState<TabState>(TAB.All);

  const toggleTab = (tab: TabState) => {
    setSelectedTab(tab);
  };

  const { data: savedAlbumData } = useGetUserSavedAlbumsQuery();
  const { data: userPlaylistsData } = useGetUserPlaylistsQuery();
  const { data: recentlyPlayedData } = useGetRecentlyPlayedTracksQuery();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.All ? 'active' : '',
            [styles.login]: true
          })}
          onClick={() => toggleTab(TAB.All)}
        >
          All
        </Button>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.Playlists ? 'active' : '',
            [styles.login]: true
          })}
          onClick={() => toggleTab(TAB.Playlists)}
        >
          Playlists
        </Button>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.Albums ? 'active' : '',
            [styles.login]: true
          })}
          onClick={() => toggleTab(TAB.Albums)}
        >
          Albums
        </Button>
        <Button
          className={classNames({
            [styles.active]: selectedTab === TAB.RecentlyPlayed ? 'active' : '',
            [styles.login]: true
          })}
          onClick={() => toggleTab(TAB.RecentlyPlayed)}
        >
          Recently Played
        </Button>
      </div>
      <div className={styles.card_container}>
        {selectedTab === TAB.All && savedAlbumData
          ? savedAlbumData.items.map((item) => {
              return (
                <Card
                  key={item.album.id}
                  item={item.album}
                />
              );
            })
          : ''}
        {selectedTab === TAB.All && userPlaylistsData
          ? userPlaylistsData.items.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                />
              );
            })
          : ''}
        {selectedTab === TAB.Playlists && userPlaylistsData
          ? userPlaylistsData.items.map((item) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                />
              );
            })
          : ''}
        {selectedTab === TAB.Albums && savedAlbumData
          ? savedAlbumData.items.map((item) => {
              return (
                <Card
                  key={item.album.id}
                  item={item.album}
                />
              );
            })
          : ''}
        {selectedTab === TAB.RecentlyPlayed && recentlyPlayedData
          ? recentlyPlayedData.items.map((item, index) => {
              return (
                <TrackItem
                  key={item.track.id}
                  item={item.track}
                  index={index}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};
