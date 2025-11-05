import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
import { WeatherApiResponse } from "../../types/weatherApiResponse";
import { useAppDispatch } from "../../store/hooks";
import { TopWeatherItem } from "../../types/topWeather";
import { setWeather } from "../../store/slices/topWeatherSlice";
import { setWeeklyWeather } from "../../store/slices/weeklyWeatherSlice";
import { setHourlyWeather } from "../../store/slices/hourlyWeatherSlice";
type FetchCurrentWeather = (
    location: string
) => Promise<WeatherApiResponse>;

const { weatherApiKey } = Constants.expoConfig?.extra || {};

// Errorを返せるほうがいい？
export const getWeatherData: FetchCurrentWeather = async (location) => {
    const dispatch = useAppDispatch();
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3&aqi=yes&alerts=yes`;
    try {
        const data: WeatherApiResponse = await axios.get(URL);

        const topData = {
            name: data.location.name,
            country: data.location.country,
            temp_c: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
            mintemp_c: data.forecast.forecastday[0].day.mintemp_c
        };

        const currentTime = Number(data.location.localtime.substring(11,13));
            
        const hourlyData = data.forecast.forecastday.flatMap((day, index) => {
            if(index === 0) {
                return day.hour.slice(currentTime, day.hour.length);
            } else if(index === 1) {
                return day.hour.slice(0, currentTime);
            } else {
                return;
            }
        }).filter((hour) => hour !== undefined);
    
        const hourlyDataFormatted = hourlyData.map((hour, index) => {
            return {
                time: index === 0 ? "Now" : hour.time.substring(11,13),
                temp_c: hour.temp_c,
                icon: hour.condition.icon,
                will_it_rain: hour.will_it_rain,
                chance_of_rain: hour.chance_of_rain,
                will_it_snow: hour.will_it_snow,
                chance_of_snow: hour.chance_of_snow,
            }
        });
    
        const weeklyData = data.forecast.forecastday.map((day, index) => {
            return {
                date: day.date,
                dayofweek: new Date(day.date).toLocaleString("en-US", { weekday: "short"}),
                icon: day.day.condition.icon,
                mintemp_c: day.day.mintemp_c,
                maxtemp_c: day.day.maxtemp_c,
                avgtemp_c: day.day.avgtemp_c,
                maxwind_kph: day.day.maxwind_kph,
                totalprecip_mm: day.day.totalprecip_mm,
                totalsnow_cm: 0,
                avgvis_km: day.day.avgvis_km,
                avghumidity: day.day.avghumidity,
                daily_will_it_rain: day.day.daily_will_it_rain,
                daily_chance_of_rain: day.day.daily_chance_of_rain,
                daily_will_it_snow: day.day.daily_will_it_snow,
                daily_chance_of_snow: day.day.daily_chance_of_snow,
                sunrise: day.astro.sunrise,
                sunset: day.astro.sunset,
                moonrise: day.astro.moonrise,
                moonset: day.astro.moonset,
                moon_phase: day.astro.moon_phase,
            };
        });
        
        dispatch(setWeather(topData));
        dispatch(setHourlyWeather(hourlyDataFormatted));
        dispatch(setWeeklyWeather(weeklyData));
        return data;
    } catch (error) {
        const err = error as AxiosError;
        throw new Error(err.response?.statusText || err.message);
    }
};
