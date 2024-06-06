// src/serverComponents/WeatherDetails.tsx
import { use } from 'react';
import { useDispatch } from 'react-redux';
import { setLatestCity } from '@store/weather/weatherSlice.ts'
import { ForecastDayF, WeatherResponseF } from '@api/weatherApi.types.frontend.ts'
import styles from './weatherDetails.module.scss';
import React from 'react';
import WeatherCityCard from '@/pages/CityWeather/components/weatherCityCard.tsx'



const dayNames = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];

function WeatherDetails({ cityPromise }: { cityPromise: Promise<WeatherResponseF> }) {
  // I might be confused about something, but I once read online that this component will memoize the pure component, so you wouldn't need to use useMemo or useCallback as it will be done by default.
  // However, I can't find any references to this now.
  // https://react.dev/learn/react-compiler#using-the-compiler-effectively
  "use memo";


  //React 19 has added a new hook called use, which is designed to handle promises and async/await patterns directly within components.
  // This experimental use hook is particularly aimed at reducing boilerplate code associated with data fetching and state management,
  // allowing for cleaner and more direct data handling patterns within React components.
  // Additionally, this hook can be called conditionally and used to read context in scenarios where early returns might otherwise complicate the use of useContext
  // or redux
  const data = use(cityPromise);
  const dispatch = useDispatch();

  // Dispatch Redux actions directly in the server component in react 19 we will no longer need useEffect to do such things
  if (data.current.location) {
    dispatch(setLatestCity(data));
  }

  return (
    <>
      <WeatherCityCard data={data.current} />
      <h6 className={styles.forecastHeader}>Pogoda na najbliższe dni:</h6>
      <div className={styles.forecastGrid}>
        {data.forecastDays.map((day: ForecastDayF, index: number) => {
          const date = new Date(day.date);
          const dayOfWeek = dayNames[date.getDay()];
          return (
            <React.Fragment key={index}>
              <div className={`${styles.cityRow} card`}>
                <div>{index === 0 ? 'jutro' : dayOfWeek}</div>
                <img src={day.icon} alt="Weather icon" className={styles.weatherIcon}/>
                <div>{day.avgTempC}°C</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

export default WeatherDetails;