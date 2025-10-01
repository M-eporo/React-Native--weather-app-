import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
import { WeatherApiResponse } from "../../types/weatherApiResponse";
type FetchCurrentWeather = (
  location: string
) => Promise<WeatherApiResponse>;

const { weatherApiKey } = Constants.expoConfig?.extra || {};
export const getWeatherData: FetchCurrentWeather = async (location) => {
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.statusText || err.message);
  }
};
