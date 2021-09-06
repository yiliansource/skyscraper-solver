/**
 * Returns the item in the array that has the lowest value supplied by the predicate, or undefined if the array is empty.
 */
export function findMin<T>(array: T[], predicate: (item: T) => number): T | undefined {
    let minItem = undefined,
        minValue = Number.MAX_VALUE;

    for (const item of array) {
        const value = predicate(item);
        if (value < minValue) {
            minItem = item;
            minValue = value;
        }
    }

    return minItem;
}

/**
 * Checks if the specified array contains any duplicates. This uses a `Set` underneath.
 */
export function hasDuplicates<T>(array: T[]): boolean {
    return array.length !== new Set(array).size;
}

/**
 * Returns an array with numbers ranging from start to end (inclusive).
 */
export function range(start: number, end: number): number[] {
    const r = [];
    for (let i = start; i <= end; i++) r.push(i);
    return r;
}
