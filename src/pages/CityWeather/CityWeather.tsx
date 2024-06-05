// src/pages/CityWeather.tsx
import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import WeatherDetails from './components/weatherDetails.tsx'
import { AutocompleteCity } from '@/pages/components/autocomplete/autocompleteCity.tsx'
import { parseBulkWeatherToFrontend, parseWeatherForecastToFrontend } from '@api/weatherApi.parsers.ts'
import LargestCitiesWeather from '@/pages/CityWeather/components/largestCitiesWeather.tsx'

const CityWeatherPage = () => {
  const { city } = useParams<{ city: string }>();

  const cityPromise = useMemo(() => parseWeatherForecastToFrontend(city || ''), [city]);
  const largestCitiesPromise = useMemo(() => parseBulkWeatherToFrontend(), []);



  return (
    <div className={'smallSize'}>
      <AutocompleteCity wide></AutocompleteCity>
      <Suspense fallback={<div>Loading weather details...</div>}>
        <LargestCitiesWeather largestCitiesPromise={largestCitiesPromise} />
      </Suspense>
      <Suspense fallback={<div>Loading weather details...</div>}>
        <WeatherDetails cityPromise={cityPromise} />
      </Suspense>
    </div>
  );
};

export default CityWeatherPage;
