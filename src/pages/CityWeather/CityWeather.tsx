// src/pages/CityWeather.tsx
import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { fetchWeather } from '@api/fetchWeather.ts'
import WeatherDetails from './serverComponents/weatherDetails.tsx'

const CityWeatherPage = () => {
  const { city } = useParams<{ city: string }>();
  const cityPromise = useMemo(() => fetchWeather(city || ''), [city])
  console.log('cityPromise', cityPromise);


  return (
    <div>
      <Suspense fallback={<div>Loading weather details...</div>}>
        <WeatherDetails cityPromise={cityPromise} />
        {/*<WeatherContainer city={city || ''} cityPromise={cityPromise} />*/}
      </Suspense>
    </div>
  );
};

export default CityWeatherPage;
