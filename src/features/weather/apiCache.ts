import axios from "axios";
import Constants from "expo-constants";
import { WeatherApiResponse } from "../../types/weatherApiResponse";


const { weatherApiKey } = Constants.expoConfig?.extra || {};
//cache_weatherテーブル用にデータを取得
export async function getWeatherForCache(region: string): Promise<WeatherApiResponse> {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${region}&days=3&aqi=yes&alerts=yes`;
    const { data } = await axios.get(URL);
    return data;
}