import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.tsx'
import CityWeatherPage from '../pages/CityWeather/CityWeather.tsx'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:city" element={<CityWeatherPage />} />
    </Routes>
  );
};