export function isStale(fetchedAt: number) {
    const FIFTEEN_MIN = 15 * 60 * 1000;
    return Date.now() - fetchedAt > FIFTEEN_MIN;
}