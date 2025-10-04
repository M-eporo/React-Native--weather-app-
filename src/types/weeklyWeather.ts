export type WeeklyWeatherItem = {
    dayofweek: string;
    icon: string;
    mintemp_c: number;
    maxtemp_c: number;
    daily_will_it_rain: boolean;
    daily_chance_of_rain: number;
    daily_will_it_snow: boolean;
    daily_chance_of_snow: number;
}

export type WeeklyWeatherState = {
    weeklyWeather: WeeklyWeatherItem[];
}