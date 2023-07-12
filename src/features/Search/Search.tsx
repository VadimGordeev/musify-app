import { type ChangeEvent, useState } from 'react';

import styles from './Search.module.scss';
import { SearchItems } from './SearchItems';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { InputField } from '../../shared/ui/InputField/InputField';
import { useGetSearchResponseQuery } from '../../store/api/search/search.api';
export const Search = () => {
  const [value, setValue] = useState('');
  const query = useDebounce<string>(value);

  const { data, error } = useGetSearchResponseQuery({ query });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <InputField
          shouldFitContainer
          value={value}
          onChange={handleChange}
          placeholder={'What do you want to listen?'}
        />
      </form>
      <div>
        {error
          ? ''
          : data && (
              <SearchItems
                albums={data.albums.items}
                artists={data.artists.items}
                playlists={data.playlists.items}
                tracks={data.tracks.items}
              />
            )}
      </div>
    </div>
  );
};
