import Constants from "expo-constants";
import axios, {AxiosError} from "axios";
import type { ResponseWeatherType } from "../../types/weather";

type FetchCurrentWeather = (location: string) => Promise<ResponseWeatherType>

const { weatherApiKey } = Constants.expoConfig?.extra || {};

export const getWeatherData: FetchCurrentWeather = async (location) => {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    console.log(location);
    try {
        const {data} = await axios.get<ResponseWeatherType>(URL);
        console.log(data);
        return data;
    } catch(error) {
        const err = error as AxiosError;
        throw new Error(err.response?.statusText || err.message);
    }
};
