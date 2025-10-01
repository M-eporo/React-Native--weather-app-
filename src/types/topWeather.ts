export type TopWeatherItem = {
    name: string;
    country: string;
    temp_c: number;
    condition: string;
    icon: string;
    maxtemp_c: number;
    mintemp_c: number;
};

export type TopWeatherState = {
    currentWeather: TopWeatherItem
}