const CreateTableRegions = `
    CREATE TABLE IF NOT EXISTS regions
    (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        region          TEXT NOT NULL UNIQUE,
        view_count      INTEGER NOT NULL DEFAULT 0,
        last_view       INTEGER NOT NULL DEFAULT 0,
        created_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
        updated_at      INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
`;
//ON DELETE CASCADE 
//データベースの外部キー制約で、親テーブルの行が削除されたときに、
//その行を参照している子テーブルの関連行も自動的に削除されるように設定するオプション
const CreateTableCacheWeather = `
    CREATE TABLE IF NOT EXISTS cache_weather
    (
        region_id       INTEGER PRIMARY KEY,
        payload         TEXT NOT NULL,
        fetched_at      INTEGER NOT NULL,
        FOREIGN KEY(region_id) REFERENCES regions(id) ON DELETE CASCADE
    );
`;

//SQLiteでは、現在FOR EACH ROWのみサポート
const CreateTriggerOnRegionsUpdated = `
    CREATE TRIGGER IF NOT EXISTS trg_regions_updated_at
    AFTER UPDATE ON regions
    FOR EACH ROW
    BEGIN
        UPDATE regions
            SET updated_at = strftime('%s', 'now')
        WHERE
            id = NEW.id;
    END;
`;

const CreateIndexRegions = `
    CREATE INDEX IF NOT EXISTS index_regions ON regions(id);
`;


/**
 * 全地域を取得、view_count降順、last_view降順
 */
const SelectRegions = `
    SELECT
        id,
        region,
        view_count,
        last_view,
        created_at,
        updated_at
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
        region,
        view_count,
        last_view,
        created_at,
        updated_at
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
        strftime('%s', 'now'),
        strftime('%s', 'now')
    );
`;

/**
 * 地域のview_countを更新
 * @param id 地域ID
 */
const UpdateRegionViewCount = `
    UPDATE regions
    SET
        view_count = view_count + 1,
        last_view = strftime('%s', 'now'),
        updated_at = strftime('%s', 'now')
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

const ResetSequence = `
    DELETE FROM 
        sqlite_sequence
    WHERE 
        name = 'regions';
`;

const RegionQueries = Object.freeze({
    CREATE_TABLE: CreateTableRegions,
    CREATE_TABLE_CACHE_WEATHER: CreateTableCacheWeather,
    CREATE_INDEX_REGIONS: CreateIndexRegions,
    CREATE_TRIGGER_ON_UPDATED: CreateTriggerOnRegionsUpdated,
    SELECT_ALL: SelectRegions,
    SELECT_BY_ID: SelectRegionById,
    INSERT_REGION: InsertRegion,
    UPDATE_REGION_VIEW_COUNT: UpdateRegionViewCount,
    DELETE_REGION: DeleteRegionById,
    RESET_SEQUENCE: ResetSequence
});



export { RegionQueries };