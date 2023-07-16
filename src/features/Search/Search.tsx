import { type ChangeEvent, useState } from 'react';

import styles from './Search.module.scss';
import { SearchItems } from './SearchItmes/SearchItems';
import { useDebounce } from '../../shared/hooks/useDebounce';
import { CategoryCard } from '../../shared/ui/Category/CategoryCard';
import { InputField } from '../../shared/ui/InputField/InputField';
import { useGetCategoriesQuery } from '../../store/api/browse/browse.api';
import { useGetSearchResponseQuery } from '../../store/api/search/search.api';

export const Search = () => {
  const [value, setValue] = useState('');
  const query = useDebounce<string>(value);

  const { data: queryData, error } = useGetSearchResponseQuery({ query });
  const { data: categoriesData } = useGetCategoriesQuery();

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
        {error ? (
          <div>
            <h1>All the rest</h1>
            {categoriesData && (
              <div className={styles.categories}>
                {categoriesData.categories.items.map((item) => {
                  return (
                    <CategoryCard
                      key={item.id}
                      category={item}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          queryData && (
            <SearchItems
              albums={queryData.albums.items}
              artists={queryData.artists.items}
              playlists={queryData.playlists.items}
              tracks={queryData.tracks.items}
            />
          )
        )}
      </div>
    </div>
  );
};
