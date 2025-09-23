import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseWeatherType } from "../../types/weather";

type CurrentWeatherType = {
    currentWeather: ResponseWeatherType
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
        }
    }
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        getWeather: (state, action: PayloadAction<ResponseWeatherType>) => {
            state.currentWeather = action.payload
        }
    }
});

export const { getWeather } = weatherSlice.actions;
export default weatherSlice.reducer;