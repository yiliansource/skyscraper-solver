import { range } from "../collections";
import { getCrossIndices, getGridCursorFromEdgeIndex } from "../grid";
import { ClueConstraint, HeightConstraint } from "./constraints";
import { CSPSolver } from "./solver";

/**
 * Attempts to solve a skyscraper grid of size NxN, with the specified edge clues (clockwise).
 * Returns an array of heights, arranged in a grid, or null if no solution could be found.
 *
 * @param size The dimensions of the grid.
 * @param clues The specified clues to use for solving. A zero indicates a missing clue.
 */
export function solve(size: number, clues: number[]): number[] | null {
    // Our variables are the grid indices from 0 to N².
    const variables = range(0, size * size - 1);

    // All variable domains are initialized with a range 1 to N (inclusive).
    const domains = new Map<number, number[]>();
    for (const variable of variables) {
        domains.set(variable, range(1, size));
    }

    // Helper function to exclude a specified height from a specified variable domain.
    function excludeHeight(index: number, predicate: (height: number) => boolean): void {
        domains.set(index, domains.get(index)!.filter(predicate));
    }

    // We can work out an initial assignment to reduce solving complexity.
    // This is done by looking at the clues, and inferring information from them.
    const assignment = new Map<number, number>();
    for (let i = 0; i < size * 4; i++) {
        const clue = clues[i];
        // Clues with zero indicate missing data, those can be skipped, since we cannot infer anything from them.
        if (clue === 0) continue;

        // We fetch the grid cursor for the edge index, in case we need to iterate over an axis.
        const [index, direction] = getGridCursorFromEdgeIndex(size, i);

        if (clue === 1) {
            // If the clue is 1, we can be sure that a skyscraper of the maximum size is infront of the axis.
            assignment.set(index, size);
            domains.set(index, []);

            // After that, we can be sure that all variables on the same row are not the maximum height.
            for (const k of getCrossIndices(size, index)) {
                if (k !== index) excludeHeight(k, (h) => h !== size);
            }
        } else if (clue === size) {
            // If the clue is equal to N, we can be sure that the axis contains skyscrapers in ascending order.
            for (let j = 0; j < size; j++) {
                const k = index + direction * j,
                    h = j + 1;
                assignment.set(k, h);
                domains.set(k, []);

                // We can be sure that all variables on the same row are not the same height.
                for (const l of getCrossIndices(size, k)) {
                    if (l !== k) excludeHeight(l, (v) => v !== h);
                }
            }
        } else {
            // Otherwise we limit the choices of heights in the direction of the axis.
            // The formula for this is Hmax = n - c + d + 1, with n being the grid size, c being the clue provided and
            // d the 0-indexed distance from the edge. The reasoning behind this is that atleast a certain number of
            // skyscrapers need to be visible from that edge.
            for (let j = 0; j < size; j++) {
                const k = index + direction * j;
                excludeHeight(k, (h) => h <= size - clue + j + 1);
            }
        }
    }

    // Create the solver instance and provide the constraints.
    const solver = new CSPSolver(variables, domains);
    solver.addConstraint(new HeightConstraint(variables, size));
    solver.addConstraint(new ClueConstraint(variables, clues, size));

    const solution = solver.solve(assignment);
    if (solution) {
        // If we find a solution, we transform it to a grid array of heights.
        return [...Array(size * size).keys()].map((i) => solution.get(i)!);
    }

    // No solution was found.
    return null;
}
