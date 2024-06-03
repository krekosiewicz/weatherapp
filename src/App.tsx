/// <reference path="../global.d.ts" />

import './App.css';
import React, { use } from 'react';
import Home from './pages/Home.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityWeatherPage from './pages/CityWeather/CityWeather.tsx'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React Canary (Version 19) with Vite and TypeScript!</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:city" element={<CityWeatherPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
