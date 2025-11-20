import { FavoriteRegionSchema } from "../db/schemas/favoriteRegion";
import { getWeatherForCache } from "../features/weather/apiCache";
import { WeatherApiResponse } from "../types/weatherApiResponse";
import { isStale } from "../utils/isStale";
import { getCachedWeather, upsertCachedWeather } from "./cacheWeatherService";


export async  function refreshWeather(regions: FavoriteRegionSchema[]) {
    const limit = createLimiter(3);

    await Promise.allSettled(
        regions.map((region) => 
            limit( async () => {
                //キャッシュされたデータをDBから取得
                const cached: {
                    payload: string;
                    fetched_at: number;
                } | null 
                = await getCachedWeather(region.id);

                //cacheが新鮮(15分以内)、更新不要
                if(cached && !isStale(cached.fetched_at)) return;

                //apiを呼ぶ
                const data: WeatherApiResponse = await getWeatherForCache(region.region);

                const formattedData = {
                    payload: {
                        region: data.location.name,
                        temp_c: data.current.temp_c,
                        condition: data.current.condition.text,
                        max_temp: data.forecast.forecastday[0].day.maxtemp_c,
                        min_temp: data.forecast.forecastday[0].day.mintemp_c,
                    }
                }
                //cacheの更新
                await upsertCachedWeather(region.id, data);
            })
        )
    );
}

/**
 * 
 * @param limit 
 * @returns 非同期関数を返す
 */
function createLimiter(limit: number) {
    let running = 0;
    const queue: (() => void)[] = [];

    return async function<T>(task: () => Promise<T>): Promise<T> {

        //リミット数以上の場合、キューにプッシュ
        if(running >= limit) await new Promise<void>((resolve) => queue.push(resolve));
        running++;

        try {
            return await task();
        } finally {
            running--;
            //キューがあれば、キューを取り出して実行
            queue.shift()?.();
        }
    };
}