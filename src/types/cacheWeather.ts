export type cachedListData = {
    id: number;
    region: string;
    temp_c: number;
    condition: string;
    max_temp: number;
    min_temp: number;
} | null[];

export type cacheResponse = {
    location: {
        region: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        }
    }
    forecast: {
        forecastday: {
            day: {
                maxtemp_c: number;
                mintemp_c: number;
            }
        }[]
    }
};