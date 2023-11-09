import { intervalToDuration } from 'date-fns';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Play } from '~/assets/icons/play.svg';

import styles from './Track.module.scss';
import { type Track } from '../../../entities/spotifyTypes';
import { useStartPlayMutation } from '../../../store/api/player/player.api';
import { useAppSelector } from '../../../store/store.types';
import { activeDevice } from '../../../store/user/user.selector';
import { Button } from '../Button/Button';

const getFormattedUnit = (value: number): string => {
  return value > 9 ? `${value}` : `0${value}`;
};
const getFormattedTrackDuration = (songDuration: number): string => {
  const seconds = +songDuration;
  const duration: Duration = intervalToDuration({
    start: 0,
    end: seconds
  });

  return duration.minutes && duration.seconds
    ? `${duration.minutes}:${getFormattedUnit(duration.seconds)}`
    : '0:00';
};

export const TrackItem = ({
  item,
  index,
  contextUri
}: {
  item: Track;
  index: number;
  contextUri?: string;
}) => {
  const [startPlay] = useStartPlayMutation();

  const deviceId = useAppSelector(activeDevice);

  return (
    <div className={styles.container}>
      <p className={styles.index}>
        {index + 1}
        <Button
          appearance="secondary"
          icon={<Play />}
          className={styles.play}
          onClick={
            contextUri
              ? () =>
                  void startPlay({
                    id: deviceId,
                    context_uri: contextUri,
                    offset: index
                  })
              : () => void startPlay({ id: deviceId, uris: item.uri })
          }
        />
      </p>
      <div className={styles.title}>
        {item.album && <img src={item.album.images[0].url} />}
        <div className={styles.info}>
          <span>{item.name}</span>
          <NavLink
            to={`/artist/${item.artists[0].id}`}
            className={styles.link}
          >
            <span>{item.artists[0].name}</span>
          </NavLink>
        </div>
      </div>
      {item.album && (
        <NavLink
          to={`/album/${item.album.id}`}
          className={styles.album}
        >
          <span>{item.album.name}</span>
        </NavLink>
      )}
      <span className={styles.duration}>
        {getFormattedTrackDuration(item.duration_ms)}
      </span>
    </div>
  );
};
