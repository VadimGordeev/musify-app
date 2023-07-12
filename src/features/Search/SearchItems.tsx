import itemsStyles from './SearchItems.module.scss';
import {
  type Album,
  type Artist,
  type Playlist,
  type Track
} from '../../entities/spotifyTypes';
import { Card } from '../../shared/ui/Card/Card';
import { TrackItem } from '../../shared/ui/Track/Track';

export const SearchItems = ({
  albums,
  artists,
  playlists,
  tracks
}: {
  albums?: [Album];
  artists?: [Artist];
  playlists?: [Playlist];
  tracks?: [Track];
}) => {
  return (
    <div className={itemsStyles.container}>
      <h1>Albums</h1>
      <div className={itemsStyles.albums}>
        {albums?.length ? (
          albums.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
              />
            );
          })
        ) : (
          <p>Nothing found for your request </p>
        )}
      </div>
      <h1>Playlists</h1>
      <div className={itemsStyles.playlists}>
        {playlists?.length ? (
          playlists.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
              />
            );
          })
        ) : (
          <p>Nothing found for your request </p>
        )}
      </div>
      <h1>Artists</h1>
      <div className={itemsStyles.artists}>
        {artists?.length ? (
          artists.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
              />
            );
          })
        ) : (
          <p>Nothing found for your request </p>
        )}
      </div>
      <h1>Tracks</h1>
      <div className={itemsStyles.tracks}>
        {tracks?.length ? (
          tracks.map((item, index) => {
            if (index < 10) {
              return (
                <TrackItem
                  key={item.id}
                  item={item}
                  index={index}
                />
              );
            }
          })
        ) : (
          <p>Nothing found for your request </p>
        )}
      </div>
    </div>
  );
};
