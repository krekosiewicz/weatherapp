// src/serverComponents/WeatherDetails.tsx
import { fetchWeather } from '@api/fetchWeather'
import { use } from 'react'

// https://react.dev/reference/rsc/server-components


function WeatherDetails({ city, cityPromise }: { city: string, cityPromise: Promise<any> }) {
  const data = use(cityPromise);
  const weather = data.current;

  return (
    <div>
      <h1>Weather in {data.location.name}</h1>
      <p>Temperature: {weather.temp_c}°C</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.wind_kph} kph</p>
    </div>
  );
}

export default WeatherDetails;
