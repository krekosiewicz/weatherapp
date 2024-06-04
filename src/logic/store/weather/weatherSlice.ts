import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherState {
  latestCity: string | null;
  latestCities: string[];
}

const initialState: WeatherState = {
  latestCity: null,
  latestCities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLatestCity: (state, action: PayloadAction<string>) => {
      state.latestCity = action.payload;
    },
    addLatestCity: (state, action: PayloadAction<string>) => {
      if (!state.latestCities.includes(action.payload)) {
        state.latestCities.push(action.payload);
      }
    },
  },
});

export const { setLatestCity, addLatestCity } = weatherSlice.actions;
export default weatherSlice.reducer;
