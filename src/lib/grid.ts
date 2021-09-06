/**
 * Arranges the specified array elements in a square spiral shape (inwards).
 * Note that if the array does not contain enough elements, the end will be filled with 'undefined's.
 */
export function spiral<T>(array: T[], size: number): T[] {
    let x = 0,
        y = 0,
        dx = 1,
        dy = 0,
        n = 0,
        tn = size;
    const spiral: T[] = [];

    for (let i = 0; i < size * size; i++) {
        // Fill in the element at the cursor position.
        spiral[x + y * size] = array[i];

        n++;
        // If the chain length passes the threshold, we rotate the cursor clockwise and reset the chain.
        if (n >= Math.floor(tn)) {
            n = 0;
            tn -= 0.5;
            // Swapping using destructuring.
            [dx, dy] = [-dy, dx];
        }

        // We move the cursor in the current direction.
        x += dx;
        y += dy;
    }

    return spiral;
}

/**
 * Returns an array of row indices that the given index is on, given a grid of size NxN.
 */
export function getRowIndices(size: number, index: number): number[] {
    const r = [],
        row = Math.floor(index / size);
    for (let i = 0; i < size; i++) r.push(i + row * size);
    return r;
}
/**
 * Returns an array of column indices that the given index is on, given a grid of size NxN.
 */
export function getColumnIndices(size: number, index: number): number[] {
    const r = [],
        col = index % size;
    for (let i = 0; i < size; i++) r.push(col + i * size);
    return r;
}
/**
 * Returns an array of row and column indices that the given index is on, given a grid of size NxN.
 */
export function getCrossIndices(size: number, index: number): number[] {
    return [...getRowIndices(size, index), ...getColumnIndices(size, index)];
}

/**
 * Given an index in an NxN grid, returns the edge indices that bound the row the index is on.
 */
export function getRowEdgeIndices(size: number, index: number): [number, number] {
    return [size + Math.floor(index / size), 4 * size - 1 - Math.floor(index / size)];
}
/**
 * Given an index in an NxN grid, returns the edge indices that bound the column the index is on.
 */
export function getColumnEdgeIndices(size: number, index: number): [number, number] {
    return [index % size, 3 * size - 1 - (index % size)];
}
/**
 * Given an index in an NxN grid, returns the edge indices that bound the axes the index is on.
 */
export function getEdgeIndices(size: number, index: number) {
    return [...getRowEdgeIndices(size, index), ...getColumnEdgeIndices(size, index)];
}

/**
 * Returns a grid cursor tuple from an edge index on an NxN grid, which can be used to iterate over an axis of a grid from an edge.
 * The returned tuple is of the form [index, direction], with 'index' being the grid index where the axis begins, while
 * 'direction' is the per-step increment to it.
 */
export function getGridCursorFromEdgeIndex(size: number, index: number): [number, number] {
    if (index < 0 || index >= size * 4) throw new Error("Invalid edge index for grid size.");

    if (index < size) return [index, size];
    if (index < size * 2) return [size - 1 + size * (index - size), -1];
    if (index < size * 3) return [size * size - 1 - (index - size * 2), -size];
    if (index < size * 4) return [size * (size - 1) - (index - size * 3) * size, 1];

    return [0, 0];
}
