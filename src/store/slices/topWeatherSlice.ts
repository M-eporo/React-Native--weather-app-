import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopWeatherItem, TopWeatherState } from "../../types/topWeather";

const initialState: TopWeatherState = {
  currentWeather: {
    name: "",
    country: "",
    temp_c: 0,
    condition: "",
    icon: "",
    maxtemp_c: 0,
    mintemp_c: 0
  }
};

export const weatherSlice = createSlice({
  name: "currentData",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<TopWeatherItem>) => {
      state.currentWeather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
