import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseCurrentWeatherType } from "../../types/weather";

type CurrentWeatherType = {
    currentWeather: ResponseCurrentWeatherType
}

const initialState: CurrentWeatherType = {
    currentWeather: {
        location: {
            name: "",
            region: "",
            country: "",
        },
        current: {
            temp_c: 0,
            condition: {
                text: "",
                icon: "",
            }
        },
        forecast: {
            forecastday: [
            {
                day: {
                    maxTemp_c: 0,
                    mintemp_c: 0,
                }
            }
        ]
        }
    }
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        getWeather: (state, action: PayloadAction<ResponseCurrentWeatherType>) => {
            state.currentWeather = action.payload
        }
    }
});

export const { getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;