// src/api/weatherApi.actions.ts
import { SuggestionB, WeatherForecastResponseB } from '@api/weatherApi.types.backend'
import { parseWeatherResponse } from '@api/weatherApi.parsers'
import { WeatherResponseF } from '@api/weatherApi.types.frontend'

export const apiActionFetchCurrentForecast = async (city: string): Promise<WeatherForecastResponseB> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${city}&days=7`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const parseWeatherForecastToFrontend = async (city: string): Promise<WeatherResponseF> => {
  const backendData = await apiActionFetchCurrentForecast(city);
  return parseWeatherResponse(backendData);
};


export const fetchAutocompleteSuggestions = async (query: string): Promise<SuggestionB[]> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${query}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getAutocompleteSuggestions = (query: string): Promise<SuggestionB[]>  => {
  if (query.length < 3) {
    return Promise.resolve([]);
  }
  return fetchAutocompleteSuggestions(query);
};