// src/pages/CityWeather.tsx
import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { parseWeatherForecastToFrontend } from '@api/weatherApi.actions.ts'
import WeatherDetails from './weatherDetails.tsx'
import { AutocompleteCity } from '@/pages/components/autocompleteCity'

const CityWeatherPage = () => {
  const { city } = useParams<{ city: string }>();

  const cityPromise = useMemo(() => parseWeatherForecastToFrontend(city || ''), [city]);


  return (
    <div className={'smallSize'}>
      <AutocompleteCity wide></AutocompleteCity>
      <Suspense fallback={<div>Loading weather details...</div>}>
        <WeatherDetails cityPromise={cityPromise} />
      </Suspense>
    </div>
  );
};

export default CityWeatherPage;
