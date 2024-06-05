// src/serverComponents/WeatherDetails.tsx
import { use } from 'react';
import { useDispatch } from 'react-redux';
import { addLatestCity, setLatestCity } from '@store/weather/weatherSlice'
import { WeatherResponseF } from '@api/weatherApi.types.frontend' // Ensure the correct path

function WeatherDetails({ cityPromise }: { cityPromise: Promise<WeatherResponseF> }) {
  "use memo";
  const data = use(cityPromise);
  const dispatch = useDispatch();

  // Dispatch Redux actions directly in the server component
  if (data.current.location) {
    dispatch(setLatestCity(data));
    dispatch(addLatestCity(data));
  }

  console.log(JSON.stringify(data, null, 2));

  return (
    <div>
      <h1>{data.current.location}</h1>
      <p>Temperatura: {data.current.temperature}°C</p>
      <p>Wilgotność: {data.current.humidity}%</p>
      <p>Siła wiatru: {data.current.windSpeed}m/s</p>
    </div>
  );
}

export default WeatherDetails;