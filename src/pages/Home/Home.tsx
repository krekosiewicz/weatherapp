import weatherImage from '@assets/weatherapp.webp';
import styles from './Home.module.scss';
import { SearchCity } from '@/pages/components/searchCity.tsx'


const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={`container centered-h`}>
        <img src={weatherImage} alt="Weather" className={`${styles.heroImage}`}/>
      </div>
      <SearchCity></SearchCity>
    </div>
  );
};

export default Home;
