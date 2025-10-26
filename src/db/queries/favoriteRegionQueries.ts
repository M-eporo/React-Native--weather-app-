const CreateTableRegions = `
    CREATE TABLE IF NOT EXISTS regions
    (
        id              INTEGER PRIMARY KEY NOT NULL UNIQUE AUTOINCREMENT,
        region          TEXT NOT NULL UNIQUE,
        view_count      INTEGER NOT NULL DEFAULT 0,
        last_view       INTEGER NOT NULL DEFAUL 0,
        created_at      TEXT DEFAULT (DATETIME('now', 'LOCALTIME')),
        updated_at      TEXT DEFAULT (DATETIME('now', 'LOCALTIME')),
    )
`;

/**
 * 全地域を取得、view_count降順、last_view降順
 */
const SelectRegions = `
    SELECT
        *
    FROM
        regions
    ORDER BY
        view_count DESC, last_view DESC;
`;

/**
 * 指定したIDで地域を取得
 * @param id 地域ID
 */
const SelectRegionById = `
    SELECT
        id,
        region
    FROM
        regions
    WHERE id = ?;
`;

/**
 * 新しい地域を挿入
 * @param region 地域名
 */
const InsertRegion = `
    INSERT INTO regions
    (
        region,
        created_at,
        updated_at   
    )
        VALUES
    (
        ?,
        DATETIME('now', 'LOCALTIME'),
        DATETIME('now', 'LOCALTIME')
    )
`;

/**
 * 地域のview_countを更新
 * @param id 地域ID
 */
const UpdateRegionViewCount = `
    UPDATE regions
    SET
        view_count = view_count + 1,
        last_view = strftime('%s', 'now', 'localtime')
    WHERE 
        id = ?;
`;

/**
 * 指定したIDの地域を削除
 * @param id 地域ID
 */
const DeleteRegionById = `
    DELETE FROM regions
    WHERE id = ?;
`;

const RegionQueries = Object.freeze({
    CREATE_TABLE: CreateTableRegions,
    SELECT_ALL: SelectRegions,
    SELECT_BY_ID: SelectRegionById,
    INSERT_REGION: InsertRegion,
    UPDATE_REGION_VIEW_COUNT: UpdateRegionViewCount,
    DELETE_REGION: DeleteRegionById,
});

export { RegionQueries };