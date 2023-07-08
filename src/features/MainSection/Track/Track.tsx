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
      <span>{index + 1}</span>
      <span>{item.track.name}</span>
      <span>{item.track.album.name}</span>
      <span>{getDistanceDate(item.added_at)}</span>
      <span>{getFormattedTrackDuration(item.track.duration_ms)}</span>
    </div>
  );
};
