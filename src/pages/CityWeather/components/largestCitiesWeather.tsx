// src/pages/components/LargestCitiesWeather.tsx
import { use, useState } from 'react'
import styles from './largestCitiesWeather.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestCity, setLatestCities } from '@store/weather/weatherSlice.ts'
import { WeatherResponseF } from '@api/weatherApi.types.frontend.ts';
import Dialog from '@/pages/components/dialog/dialog.tsx'
import WeatherCityCard from '@/pages/CityWeather/components/weatherCityCard.tsx'

const LargestCitiesWeather = ({ largestCitiesPromise }: { largestCitiesPromise: Promise<WeatherResponseF[]> }) => {
  const data = use(largestCitiesPromise);
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  if (data && data.length) {
    dispatch(setLatestCities(data));
  }

  const latestCity = useSelector(getLatestCity);



  return (
    <>
      <div className={styles.navigation}>
        <div className={'appButton'} onClick={openDialog}>Porównaj pogodę z innymi miastami</div>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <WeatherCityCard data={latestCity?.current} />
        <div className={styles.weatherGrid}>
          {data.map((city: WeatherResponseF, index: number) => (
            <div key={index} className={styles.cityRow}>
              <div>{city.current.location}</div>
              <img src={city.current.icon} alt="Weather icon" className={styles.weatherIcon} />
              <div>{city.current.temperature}°C</div>
            </div>
          ))}
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1 fr 1fr'}}></div>
      </Dialog>
    </>
  );
};

export default LargestCitiesWeather;