import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeeklyWeatherItem, WeeklyWeatherState } from "../../types/weeklyWeather";

const initialState: WeeklyWeatherState = {
    weeklyWeather: []
};

export const weeklyWeatherSlice = createSlice({
    name: "weeklyWeather",
    initialState,
    reducers: {
        setWeeklyWeather: (state, action: PayloadAction<WeeklyWeatherItem[]>) => {
            state.weeklyWeather = action.payload;
        }
    }
});

export const { setWeeklyWeather } = weeklyWeatherSlice.actions;
export default weeklyWeatherSlice.reducer;

