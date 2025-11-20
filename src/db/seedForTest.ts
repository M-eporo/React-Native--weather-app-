import { execute, fetch } from "./dbService";


export async function seedForTest() {
    await execute(
        { sql: "INSERT OR IGNORE INTO regions(region) VALUES (?)", params: ["London"] },
        { sql: "INSERT OR IGNORE INTO regions(region) VALUES (?)", params: ["shanghai"] }
    );

    const regions = await fetch<{id: number, region: string}>({ sql: "SELECT id, region FROM regions" });

    const payload = JSON.stringify({ current: { temp_c: 12, condition: { text: "Fine"}}});

    for (const r of regions) {
        await execute({
            sql: `
                INSERT OR REPLACE INTO cache_weather (region_id, payload, fetched_at)
                VALUES(?, ?, ?)
            `,
            params: [r.id, payload, Date.now()]
        })
    }
}