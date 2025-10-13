export type WeeklyWeatherItem = {
    date: string;
    dayofweek: string;
    icon: string;
    mintemp_c: number;
    maxtemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: boolean;
    daily_chance_of_rain: number;
    daily_will_it_snow: boolean;
    daily_chance_of_snow: number;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
}

export type WeeklyWeatherState = {
    weeklyWeather: WeeklyWeatherItem[];
}

/*
値	意味
New Moon	新月（見えない）
Waxing Crescent	三日月（満ちていく）
First Quarter	上弦の月（半分）
Waxing Gibbous	満月に近い（満ちていく途中）
Full Moon	満月
Waning Gibbous	満月の後（欠け始め）
Last Quarter	下弦の月（半分）
Waning Crescent	かけていく三日月（新月に近い）
*/