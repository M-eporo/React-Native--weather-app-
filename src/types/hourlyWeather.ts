export type HourlyWeatherItem = {
    time: string;
    temp_c: number;
    icon: string;
}

export type HourlyWeatherState = {
    hourlyWeather: HourlyWeatherItem[];
}