import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HourlyWeatherItem, HourlyWeatherState } from "../../types/hourlyWeather";

const initialState: HourlyWeatherState = {
    hourlyWeather: [],
};

const hourlyWeatherSlice = createSlice({
    name: "hourlyWeather",
    initialState,
    reducers: {
        setHourlyWeather: (state, action: PayloadAction<HourlyWeatherItem[]>) => {
            state.hourlyWeather = action.payload;
        }
    }
});

export const { setHourlyWeather } = hourlyWeatherSlice.actions;
export default hourlyWeatherSlice.reducer;

