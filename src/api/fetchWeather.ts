// src/api/fetchWeather.ts
export const fetchWeather = async (city: string) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_WEATHER_API_KEY}&q=${city}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
