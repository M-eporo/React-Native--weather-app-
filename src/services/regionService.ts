import { execute, fetch } from "../db/dbService"
import { RegionQueries } from "../db/queries/favoriteRegionQueries"
import { FavoriteRegionSchema } from "../db/schemas/favoriteRegion";
import { FavoriteRegion } from "../types/favoriteRegion";

/**
 * お気に入り地域テーブル作成
 */
const createTable = async () => {
    console.log("Creating regions table...");
    await execute({ sql: RegionQueries.CREATE_TABLE })
    console.log("Table created!");
};

/**
 * お気に入り地域をすべて取得
 * @returns お気に入り地域配列
 */
const getRegions = async (): Promise<FavoriteRegion[]> => {
    const rows = await fetch<FavoriteRegionSchema>({ sql: RegionQueries.SELECT_ALL})
    const favoriteRegions = rows.map( row => {
        return {
            id: row.id,
            region: row.region,
            view_count: row.view_count,
            last_view: row.last_view,
            created_at: row.created_at,
            updated_at: row.updated_at
        };
    });
    return favoriteRegions;
};

/**
 * お気に入り地域をIDで取得
 * @param id 
 * @returns idに該当するお気に入り地域、該当しなければundefined
 */
const getRegionById = async (id: number): Promise<FavoriteRegion | undefined> => {
    const rows = await fetch<FavoriteRegionSchema>({
        sql: RegionQueries.SELECT_BY_ID,
        params: [id]
    });
    if(rows.length === 0) {
        return undefined;
    }

    const region = rows[0];
    return {
        id: region.id,
        region: region.region,
        view_count: region.view_count,
        last_view: region.last_view,
        created_at: region.created_at,
        updated_at: region.updated_at
    };
};



/**
 * お気に入り地域を追加
 * @param newRegion 
 * @retuns void
 */
const addRegion = async (newRegion: string): Promise<void> => {
    await execute({
        sql: RegionQueries.INSERT_REGION,
        params: [newRegion]
    });
};

/**
 * お気に入り地域を削除する
 * @param id 
 */
const deleteRegion = async(id: number): Promise<void> => {
    await execute({
        sql: RegionQueries.DELETE_REGION,
        params: [id]
    });
};

/**
 * お気に入り地域の閲覧回数と最終閲覧日時を更新
 * @param id 
 */
const updateViewCount = async(id: number): Promise<void> => {
    await execute({
        sql: RegionQueries.UPDATE_REGION_VIEW_COUNT,
        params: [id]
    });
};

const resetSequence = async () => {
    await execute({ sql: RegionQueries.RESET_SEQUENCE})
};

export const regionService = Object.freeze({
    createTable,
    getRegions,
    getRegionById,
    addRegion,
    deleteRegion,
    updateViewCount,
    resetSequence,
});
