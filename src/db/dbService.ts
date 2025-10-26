import * as SQLite from 'expo-sqlite';

export type sqlArg = {
    sql: string;
    params?: (string | number)[]; //文字列、数字のいずれも含んでいてもよい配列
}
const DB_NAME = "WeatherAPP.db";

/**
 * 取得系SQL実行
 * @param sqlArg SQL文とパラメーター 
 * @returns 取得したデータ配列
 */
const fetch = async<T>(sqlArg: sqlArg): Promise<T[]> => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    const { sql, params } = sqlArg;
    try {
        const allRows = await db.getAllAsync<T>(sql, ...(params || []));
        return allRows;
    } catch(error) {
        throw error;
    }
};

/**
 * 更新系SQL実行
 * @param sqlArgs SQL文とパラメーター
 * @returns void
 */

//...sqlArgs 可変長引数で配列に変換して、for of で一つずつ実行
const execute = async (...sqlArgs: sqlArg[]): Promise<void> => {
    const db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.withTransactionAsync( async () => {
        for (const sqlArg of sqlArgs) {
            const { sql, params } = sqlArg;
            try {
                await db.runAsync(sql, ...(params || []));
            } catch(error) {
                throw error;
            }
        }
    });
};


export {fetch, execute};