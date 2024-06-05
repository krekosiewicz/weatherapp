import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherResponseF } from '@api/weatherApi.types.frontend.ts' // Ensure the correct path


interface WeatherState {
  latestCity: WeatherResponseF | null;
  latestCities: WeatherResponseF[];
}

const initialState: WeatherState = {
  latestCity: null,
  latestCities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLatestCity: (state, action: PayloadAction<WeatherResponseF>) => {
      state.latestCity = action.payload;
    },
    addLatestCity: (state, action: PayloadAction<WeatherResponseF>) => {
      if (!state.latestCities.includes(action.payload)) {
        state.latestCities.push(action.payload);
      }
    },
  },
});

export const getLatestCity = (state: { weather: WeatherState }) => state.weather.latestCity;
export const getLatestCities = (state: { weather: WeatherState }) => state.weather.latestCities;


export const { setLatestCity, addLatestCity } = weatherSlice.actions;
export default weatherSlice.reducer;
