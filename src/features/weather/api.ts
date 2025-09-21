import Constants from "expo-constants";
import axios, {AxiosError} from "axios";
import type { ResponseCurrentWeatherType } from "../../types/responseCurrentWeather";

type FetchCurrentWeather = (location: string) => Promise<ResponseCurrentWeatherType>

const { weatherApiKey } = Constants.expoConfig?.extra || {};
const URL = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=London&aqi=yes`;


export const fetchCurrentWeather: FetchCurrentWeather = async (location) => {
    console.log(location);
    try {
        const {data} = await axios.get<ResponseCurrentWeatherType>(URL);
        console.log(data);
        return data;
    } catch(error) {
        const err = error as AxiosError;
        throw new Error(err.response?.statusText || err.message);
    }
};
