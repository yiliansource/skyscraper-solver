import { expect } from "chai";

import { solve } from "@/lib/solver/solve";

const cases: [number, number[], number[]][] = [
    [4, [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3], [1, 3, 4, 2, 4, 2, 1, 3, 3, 4, 2, 1, 2, 1, 3, 4]],
    [4, [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0], [2, 1, 4, 3, 3, 4, 1, 2, 4, 2, 3, 1, 1, 3, 2, 4]],
    [
        5,
        [5, 0, 3, 1, 0, 0, 1, 0, 0, 5, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0],
        [1, 3, 2, 5, 4, 2, 1, 4, 3, 5, 3, 5, 1, 4, 2, 4, 2, 5, 1, 3, 5, 4, 3, 2, 1],
    ],
    [
        5,
        [0, 5, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 3, 0, 0, 0, 3, 0],
        [4, 1, 3, 5, 2, 3, 2, 1, 4, 5, 5, 3, 2, 1, 4, 2, 4, 5, 3, 1, 1, 5, 4, 2, 3],
    ],
    [
        6,
        [3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4],
        [2, 1, 4, 3, 5, 6, 1, 6, 3, 2, 4, 5, 4, 3, 6, 5, 1, 2, 6, 5, 2, 1, 3, 4, 5, 4, 1, 6, 2, 3, 3, 2, 5, 4, 6, 1],
    ],
    [
        6,
        [0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0],
        [5, 6, 1, 4, 3, 2, 4, 1, 3, 2, 6, 5, 2, 3, 6, 1, 5, 4, 6, 5, 4, 3, 2, 1, 1, 2, 5, 6, 4, 3, 3, 4, 2, 5, 1, 6],
    ],
];

describe("solve tests", function () {
    this.timeout(10000);

    for (const [size, clues, expected] of cases) {
        it(`solves ${size}x${size} puzzles`, function () {
            const result = solve(size, clues);

            expect(result && result.length).to.equal(expected.length, "Invalid solution length.");
            expect(result).to.deep.equal(expected, "Invalid solution.");
        });
    }
});
