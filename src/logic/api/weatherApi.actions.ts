// src/api/weatherApi.actions.ts
import {
  BulkQueryResponseB,
  SuggestionB,
  WeatherForecastResponseB,
  WeatherForecastResponseBulkB
} from '@api/weatherApi.types.backend'
import { largestCitiesInPoland } from '@store/largestPolishCities.const.ts'

export const apiActionFetchCurrentForecast = async (city: string): Promise<WeatherForecastResponseB> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${city}&days=7`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const apiActionFetchBulkWeather = async (): Promise<WeatherForecastResponseBulkB> => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=bulk&days=7`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locations: largestCitiesInPoland.map(city => ({ q: city }))
      })
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const sanitizedData = data.bulk.map((item: BulkQueryResponseB)=> {
    return {
      current: item.query.current,
      forecast: item.query.forecast,
      location: item.query.location
    }
  });
  return sanitizedData;
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