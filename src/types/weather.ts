export type ResponseCurrentWeatherType = {
    location: {
        name: string;
        region: string;
        country: string;
    },
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        }
    },
    forecast: {
        forecastday: [
            {
                day: {
                    maxtemp_c: number,
                    mintemp_c: number,
                }
            }
        ]
    }
};

export type CurrentWeatherType = {
    currentWeather: ResponseCurrentWeatherType
}