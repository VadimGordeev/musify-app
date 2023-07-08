import { formatDistance, intervalToDuration } from 'date-fns';

import styles from './Track.module.scss';
import { type Track } from '../../../entities/spotifyTypes';

const getFormattedUnit = (value: number): string => {
  return value > 9 ? `${value}` : `0${value}`;
};

const getDistanceDate = (duration: string): string => {
  const durationDateFrom = new Date();
  const durationDateTo = new Date(duration);
  const distance = formatDistance(durationDateTo, durationDateFrom, {
    addSuffix: true
  });
  return distance;
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

export const TrackItem = ({ item, index }: { item: Track; index: number }) => {
  return (
    <div className={styles.container}>
      <span className={styles.index}>{index + 1}</span>
      <div className={styles.title}>
        <img src={item.track.album.images[0].url} />
        <div className={styles.info}>
          <span>{item.track.name}</span>
          <span>{item.track.artists[0].name}</span>
        </div>
      </div>
      <span className={styles.album}>{item.track.album.name}</span>
      <span className={styles.date}>{getDistanceDate(item.added_at)}</span>
      <span className={styles.duration}>
        {getFormattedTrackDuration(item.track.duration_ms)}
      </span>
    </div>
  );
};
