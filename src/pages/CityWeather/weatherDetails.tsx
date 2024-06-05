// src/serverComponents/WeatherDetails.tsx
import { use } from 'react'

// https://react.dev/reference/rsc/server-components


function WeatherDetails({  cityPromise }: { cityPromise: Promise<any> }) {
  const data = use(cityPromise);
  console.log(data)
  const weather = data.current;

  return (
    <div>
      <h1>{data.location.name}</h1>
      <p>Temperatura: {weather.temp_c}°C</p>
      <p>Wilgotnosc: {weather.humidity}%</p>
      <p>Siła wiatru: {weather.wind_kph} kph</p>
    </div>
  );
}

export default WeatherDetails;
