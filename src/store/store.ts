import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/topWeatherSlice";
import hourlyWeatherReducer from "./slices/hourlyWeatherSlice";

export const store = configureStore({
  reducer: {
    currentData: weatherReducer, //state.currentData.currentWeather
    hourlyData: hourlyWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
