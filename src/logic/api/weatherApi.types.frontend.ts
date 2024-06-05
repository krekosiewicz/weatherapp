// src/logic/api/weatherApi.types.frontend.ts

export type WeatherResponseF = {
  current: WeatherCurrentF;
  forecastDays: ForecastDayF[];
}

export type WeatherCurrentF = {
  location: string;
  icon: string; // URL to the icon
  sunnyPeriods: SunnyPeriod[];
  astro: AstroF;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
}

export type ForecastDayF = {
  date: string;
  icon: string; // URL to the icon
  maxTempC: number;
  minTempC: number;
  avgTempC: number;
}

export type SunnyPeriod = {
  start: string;
  end: string;
}

export type AstroF = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonIllumination: string;
}
