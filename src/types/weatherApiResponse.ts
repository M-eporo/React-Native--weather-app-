export type WeatherApiResponse= {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        precip_mm: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        windchill_c: number;
        heatindex_c: number;
        dewpoint_c: number;
        vis_km: number;
        uv: number;
        gust_kph: number;
        
    };
    forecast: {
        forecastday: {
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                avgtemp_c: number;
                maxwind_kph: number;
                totalprecip_mm: number;
                totalsnow_cm: number;
                avgvis_km: number //平均視界
                avghumidity: number;
                daily_will_it_rain: boolean;
                daily_chance_of_rain: number;
                daily_will_it_snow: boolean;
                daily_chance_of_snow: number;
                condition: {
                    text: string;
                    icon: string;
                };
            };
            hour: {
                time: string;
                temp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
                wind_kph: number;
                wind_degree: number;
                wind_dir: string;
                pressure_mb: number;
                precip_mm: number;
                snow_cm: number;
                humidity: number;
                cloud: number;
                feelslike_c: number;
                windchill_c: number;
                heatindex_c: number;
                dewpoint_c: number;
                will_it_rain: boolean;
                chance_of_rain: number;
                will_it_snow: boolean;
                chance_of_snow: number;
                vis_km: number;
                gust_kph: number;
                uv: number;
            }[];
        }[];
    };
};