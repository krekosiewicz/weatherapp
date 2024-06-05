// src/logic/api/weatherApi.parsers.ts
import {
  WeatherForecastResponseB,
  HourB, AstroB
} from './weatherApi.types.backend'
import {
  WeatherResponseF,
  WeatherCurrentF,
  ForecastDayF,
  SunnyPeriod,
  AstroF
} from './weatherApi.types.frontend';

export function parseWeatherResponse(rawData: WeatherForecastResponseB): WeatherResponseF {
  return {
    current: parseCurrentWeather(rawData),
    forecastDays: parseForecastDays(rawData)
  };
}

function parseCurrentWeather(data: WeatherForecastResponseB): WeatherCurrentF {
  const currentWeather = data.current;
  const location = data.location;

  return {
    location: location.name,
    icon: currentWeather.condition.icon,
    sunnyPeriods: extractSunnyPeriods(data.forecast.forecastday[0].hour),
    astro: parseAstro(data.forecast.forecastday[0].astro),
    temperature: currentWeather.temp_c,
    humidity: currentWeather.humidity,
    windSpeed: currentWeather.wind_kph,
    windDirection: currentWeather.wind_dir,
    uvIndex: currentWeather.uv
  };
}

function parseForecastDays(data: WeatherForecastResponseB): ForecastDayF[] {
  return data.forecast.forecastday.slice(0, 7).map(day => ({
    date: day.date,
    icon: day.day.condition.icon,
    maxTempC: day.day.maxtemp_c,
    minTempC: day.day.mintemp_c,
    avgTempC: day.day.avgtemp_c
  }));
}

function extractSunnyPeriods(hours: HourB[]): SunnyPeriod[] {
  const periods: SunnyPeriod[] = [];
  let currentPeriod: SunnyPeriod | null = null;

  hours.forEach(hour => {
    if (hour.condition.text.includes('Sunny')) {
      if (!currentPeriod) {
        currentPeriod = { start: hour.time, end: hour.time };
        periods.push(currentPeriod);
      } else {
        currentPeriod.end = hour.time;
      }
    } else {
      currentPeriod = null;
    }
  });

  return periods;
}

function parseAstro(astro: AstroB): AstroF {
  return {
    sunrise: astro.sunrise,
    sunset: astro.sunset,
    moonrise: astro.moonrise,
    moonset: astro.moonset,
    moonPhase: astro.moon_phase,
    moonIllumination: astro.moon_illumination
  };
}
