// src/components/WeatherContainer.tsx
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setLatestCity, addLatestCity } from '../../../store/weather/weatherSlice';
import WeatherDetails from '../serverComponents/weatherDetails'
import { fetchWeather } from '@/logic/api/fetchWeather.ts'

const WeatherContainer = ({ city, cityPromise }: { city: string, cityPromise?: Promise<any> }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Dispatch Redux actions when the component mounts
  //   dispatch(setLatestCity(city));
  //   dispatch(addLatestCity(city));
  // }, [city, dispatch]);

  return (
    <div>
      <WeatherDetails cityPromise={cityPromise} />
    </div>
  );
};

export default WeatherContainer;
