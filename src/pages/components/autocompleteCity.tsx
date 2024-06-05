import styles from './autocompleteCity.module.scss';
import searchIcon from '@assets/search-icon.svg';
import { Suspense, useMemo, useState, useEffect,FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';
import { getAutocompleteSuggestions } from '../../logic/api/weatherApi.actions';
import { useDebounce } from '@uidotdev/usehooks';
import { AutocompleteList } from '@/pages/components/autocompleteList'
import { SuggestionB } from '@api/weatherApi.types.backend.ts'


export const AutocompleteCity: FC<{wide?: boolean}> = ({wide}) => {
  const [city, setCity] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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


  const handleSuggestionClick = (suggestion: SuggestionB) => {
    navigate(`/${suggestion.name}`);
    setCity('');
    setIsOpen(false);
  };

  useEffect(() => {
    if (debouncedSearch.length > 3) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch]);

  const suggestionPromise = useMemo(() => getAutocompleteSuggestions(debouncedSearch), [debouncedSearch]);

  return (
    <>
      <form className={`${styles.searchBox} ${wide ? styles.wide : ''}`} onSubmit={submitAction}>
        <div className={'appInputTextField'}>
          <input
            autoComplete="off"
            type="text"
            name="city"
            placeholder="Pogoda dla..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {isOpen && (
            <Suspense>
              {city && (
                <AutocompleteList
                  onClose={() => setIsOpen(false)}
                  suggestionPromise={suggestionPromise}
                  onSuggestionClick={handleSuggestionClick}
                />
              )}
            </Suspense>
          )}
        </div>
        <div className={'appButton'} onClick={submitAction}>
          <img className={styles.searchIcon} src={searchIcon} alt="Search Icon" />
        </div>
      </form>
      {error && <p className={styles.searchBox}>{error}</p>}
    </>
  );
};
