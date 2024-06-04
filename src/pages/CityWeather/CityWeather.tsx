// src/pages/CityWeather.tsx
import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { weatherApiActions } from '../../logic/api/weatherApi.actions.ts'
import WeatherDetails from './serverComponents/weatherDetails.tsx'
import { SearchCity } from '@/pages/components/searchCity.tsx'

const CityWeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  const cityPromise = useMemo(() => weatherApiActions(city || ''), [city])
  console.log('cityPromise', cityPromise);


  return (
    <div>
      <SearchCity></SearchCity>
      <Suspense fallback={<div>Loading weather details...</div>}>
        <WeatherDetails cityPromise={cityPromise} />
        {/*<WeatherContainer city={city || ''} cityPromise={cityPromise} />*/}
      </Suspense>
    </div>
  );
};

export default CityWeatherPage;
