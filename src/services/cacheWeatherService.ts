import { execute, fetch } from "../db/dbService";
import { WeatherApiResponse } from "../types/weatherApiResponse";

/**
 * cacheからデータを取得する
 * @param regionId 取得したい地域のid
 * @returns 
 */
export async function getCachedWeather(regionId: number) {
    const rows = await fetch<{ payload: string, fetched_at: number }>({
        sql: "SELECT payload, fetched_at FROM cache_weather WHERE region_id = ?",
        params: [regionId]
    });

    if(rows.length === 0) return null;
    return {
        payload: JSON.parse(rows[0].payload),
        fetched_at: rows[0].fetched_at,
    };
}

/**
 * cache更新用の関数
 * @param regionId 
 * @param data 
 */
export async function upsertCachedWeather(regionId: number, data: WeatherApiResponse) {
    await execute({
        sql: `
            INSERT OR REPLACE INTO cache_weather
                (region_id, payload, fetched_at)
            VALUES
                (?, ?, ?)
        `,
        params: [regionId, JSON.stringify(data), Date.now()]
    });
}
