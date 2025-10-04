export type HourlyWeatherItem = {
    time: string;
    temp_c: number;
    icon: string;
    will_it_rain: boolean;
    chance_of_rain: number;
    will_it_snow: boolean;
    chance_of_snow: number;
}

export type HourlyWeatherState = {
    hourlyWeather: HourlyWeatherItem[];
}