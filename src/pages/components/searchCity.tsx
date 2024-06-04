import styles from './searchCity.module.scss';
import searchIcon from '@assets/search-icon.svg';
import { Suspense, use, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';
import { getAutocompleteSuggestions } from '../../logic/api/weatherApi.actions.ts';
import { useDebounce } from '@uidotdev/usehooks';

const AutocompleteSuggestions = ({ promise }) => {
  const suggestions = use(promise);
  return (
    <ul>
      {suggestions.map((suggestion) => (
        <li key={suggestion.id}>{suggestion.name}</li>
      ))}
    </ul>
  );
};

export const SearchCity = () => {
  // "use memo"; TODO check it later
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(city, 500);

  const [error, submitAction] = useActionState(
    async () => {
      if (city.length < 3) {
        return "Miejsce musi mieć co najmniej 3 znaki";
      }
      navigate(`/${city}`);
      return null;
    },
    null
  );

  const handleSearch = (e) => {
    e.preventDefault();
    submitAction();
  };

  const suggestionPromise = useMemo(() => getAutocompleteSuggestions(debouncedSearch), [debouncedSearch])

  return (
    <>
      <form action={submitAction} className={styles.searchBox} onSubmit={handleSearch}>
        <div className={`appInputTextField`}>
          <input
            type="text"
            name="city"
            placeholder="Pogoda dla..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={'appButton'} onClick={handleSearch}>
          <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
        </div>
      </form>
      {error && <p className={styles.searchBox}>{error}</p>}
      <Suspense fallback={<div>Loading suggestions...</div>}>
        {city && <AutocompleteSuggestions promise={suggestionPromise} />}
      </Suspense>
    </>
  );
};
