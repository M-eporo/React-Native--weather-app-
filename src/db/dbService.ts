import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export type sqlArg = {
    sql: string;
    params?: (string | number)[];   //文字列、数字のいずれも含んでいてもよい配列
}
const DB_NAME = "WeatherAPP.db";
let dbInstance: SQLite.SQLiteDatabase | null = null;
    
/**
 * データベースインスタンスを取得（シングルトン）
 * @returns DBインスタンス
 */
const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
    if (!dbInstance) {
        console.log('Opening database:', DB_NAME);
        dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
        console.log('Database opened successfully');
    }
    return dbInstance;
};


/**
 * 取得系SQL実行
 * @param sqlArg SQL文とパラメーター 
 * @returns 取得したデータ配列
 */
const fetch = async<T>(sqlArg: sqlArg): Promise<T[]> => {
    const db = await getDatabase();
    const { sql, params } = sqlArg;
    
    console.log('Executing fetch SQL:', sql);
    console.log('With params:', params);
    
    try {
        const allRows = await db.getAllAsync<T>(sql, ...(params || []));
        console.log('Fetch successful, rows:', allRows.length);
        return allRows;
    } catch(error) {
        console.error('❌ Fetch error:', error);
        console.error('SQL:', sql);
        console.error('Params:', params);
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
    const db = await getDatabase();
    try {
        await db.withTransactionAsync( async () => {
            for (const sqlArg of sqlArgs) {
                const { sql, params } = sqlArg;
                try {
                    await db.runAsync(sql, ...(params || []));
                } catch(error) {
                    console.error('Execute error:', error);
                    console.error('SQL:', sql);
                    console.error('Params:', params);
                    throw error;
                }
            }
        });
    } catch (error) {
        console.error("Transaction error:", error);
        throw error;
    }
};

const closeDatabase = async (): Promise<void> => {
    if(dbInstance) {
        await dbInstance.closeAsync();
        dbInstance = null;
            console.log('Database closed');
    }
};

export {fetch, execute, getDatabase, closeDatabase};

// const execute = async (...sqlArgs: sqlArg[]): Promise<void> => {
//     const db = await getDatabase();
//     console.log(`Executing ${sqlArgs.length} SQL statement(s) in transaction`);
//     try {
//         await db.withTransactionAsync(async () => {
//             for (let i = 0; i < sqlArgs.length; i++) {
//                 const sqlArg = sqlArgs[i];
//                 const { sql, params } = sqlArg;
//                 console.log(`[${i + 1}/${sqlArgs.length}] Executing SQL:`, sql);
//                 console.log('With params:', params);
//                 try {
//                     const result = await db.runAsync(sql, ...(params || []));
//                     console.log(`[${i + 1}/${sqlArgs.length}] Success:`, result);
//                 } catch(error) {
//                     console.error(`❌ [${i + 1}/${sqlArgs.length}] Execute error:`, error);
//                     console.error('SQL:', sql);
//                     console.error('Params:', params);
//                     throw error;
//                 }
//             }
//         });
//         console.log('✅ Transaction completed successfully');
//     } catch(error) {
//         console.error('❌ Transaction failed:', error);
//         throw error;
//     }
// };

// /**
//  * データベースファイルを削除（開発時のみ使用）
//  */
// export const deleteDatabase = async (): Promise<void> => {
//     try {
//         const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;
//         const fileInfo = await FileSystem.getInfoAsync(dbPath);
        
//         if (fileInfo.exists) {
//             await FileSystem.deleteAsync(dbPath);
//             console.log('Database deleted successfully');
//         }
//     } catch (error) {
//         console.error('Error deleting database:', error);
//     }
// };