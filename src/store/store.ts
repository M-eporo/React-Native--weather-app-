import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/topWeatherSlice";
import hourlyWeatherReducer from "./slices/hourlyWeatherSlice";
import weeklyWeatherReducer from "./slices/weeklyWeatherSlice";
import initListReducer from "./slices/initListSlice";

export const store = configureStore({
  reducer: {
    currentData: weatherReducer, //state.currentData.currentWeather
    hourlyData: hourlyWeatherReducer,
    weeklyData: weeklyWeatherReducer,
    initData: initListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
