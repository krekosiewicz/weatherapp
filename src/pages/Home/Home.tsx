import weatherImage from '@assets/weatherapp.webp';
import styles from './Home.module.scss';
import { AutocompleteCity } from '@/pages/components/autocomplete/autocompleteCity.tsx'


const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={`container centered-h`}>
        <img src={weatherImage} alt="Weather" className={`${styles.heroImage}`}/>
      </div>
      <AutocompleteCity></AutocompleteCity>
    </div>
  );
};

export default Home;
