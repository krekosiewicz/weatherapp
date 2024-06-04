import styles from './searchCity.module.scss';
import searchIcon from '@assets/search-icon.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActionState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

export const SearchCity = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(city, 500);

  const [error, submitAction, isPending] = useActionState(
    async () => {
      if (debouncedSearchTerm.length < 5) {
        return "Miejsce musi mieć co najmniej 4 znaki";
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

  return (
    <>
      <form action={submitAction} className={styles.searchBox} onSubmit={handleSearch}>
        <div className={`appInputTextField`}>
          <input
            type="text"
            name="debouncedSearchTerm"
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
    </>
  );
};
