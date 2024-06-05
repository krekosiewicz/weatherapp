import styles from './searchCity.module.scss';
import searchIcon from '@assets/search-icon.svg';
import { Suspense, useMemo, useState, useEffect, useRef, use, FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';
import { getAutocompleteSuggestions, Suggestion } from '../../logic/api/weatherApi.actions.ts';
import { useDebounce } from '@uidotdev/usehooks';

type AutocompleteSuggestionsProps = {
  suggestionPromise: Promise<Suggestion[]>;
  onSuggestionClick: (suggestion: Suggestion) => void;
};

const AutocompleteSuggestions = ({ suggestionPromise, onSuggestionClick }: AutocompleteSuggestionsProps) => {
  const suggestions = use(suggestionPromise);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      listRef.current?.children[selectedIndex + 1]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      listRef.current?.children[selectedIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      onSuggestionClick(suggestions[selectedIndex]);
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector<HTMLInputElement>('[name="city"]');
    inputElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, suggestions]);

  return (
    <div ref={listRef} className={'autocompleteList'}>
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.id}
          className={`${'suggestionItem'} ${index === selectedIndex ? 'activeSuggestion' : ''}`}
          onClick={() => {onSuggestionClick(suggestion); console.log('aaa')}}
        >
          {suggestion.name}
        </div>
      ))}
    </div>
  );
};

export const SearchCity: FC<{isFullWidth: boolean}> = ({isFullWidth}) => {
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


  const handleSuggestionClick = (suggestion: Suggestion) => {
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
      <form className={`${styles.searchBox} ${isFullWidth ? styles.fullWidth : ''}`} onSubmit={submitAction}>
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
                <AutocompleteSuggestions
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
