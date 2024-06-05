import React from 'react';
import styles from './common.module.scss';
import { WeatherCurrentF, WeatherResponseF } from '@api/weatherApi.types.frontend.ts'

interface WeatherCardProps {
  data: WeatherCurrentF | undefined;
}

const WeatherCityCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className={`${styles.cityCardDetails} card`}>
      <h1 className={styles.cityHeader}>
        {data.location}
        <img src={data.icon} alt="Weather icon" style={{ width: '80px', height: '80px' }}/>
      </h1>
      <p>Temperatura: {data.temperature}°C</p>
      <p>Wilgotność: {data.humidity}%</p>
      <p>Siła wiatru: {data.windSpeed}m/s</p>
    </div>
  );
};

export default WeatherCityCard;