// src/api/weatherApi.actions.ts
export const weatherApiActions = async (city: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${city}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const fetchAutocompleteSuggestions = async (query: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${query}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getAutocompleteSuggestions = (query: string) => {
  if (query.length < 3) {
    return Promise.resolve([]);
  }
  return fetchAutocompleteSuggestions(query);
};