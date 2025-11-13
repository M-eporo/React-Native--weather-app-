type FavoriteRegionSchema = {
    id: number;
    region: string;
    view_count: number;
    last_view: number;
    created_at: number;
    updated_at: number;
}

type CacheWeatherSchema = {
    region_id: number;
    payload: string;
    fetched_at: number;
}
export type { FavoriteRegionSchema, CacheWeatherSchema };