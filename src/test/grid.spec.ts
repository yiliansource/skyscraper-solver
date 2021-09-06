import { expect } from "chai";

import { range } from "@/lib/collections";
import {
    getColumnEdgeIndices,
    getColumnIndices,
    getGridCursorFromEdgeIndex,
    getRowEdgeIndices,
    getRowIndices,
    spiral,
} from "@/lib/grid";

import { runTestCases, TestCases } from "./helpers";

describe("grid utilities", () => {
    describe("#spiral()", () => {
        const cases: TestCases<[size: number, array: number[]], number[]> = [
            [
                [3, range(1, 9)],
                [1, 2, 3, 8, 9, 4, 7, 6, 5],
            ],
            [
                [4, range(1, 16)],
                [1, 2, 3, 4, 12, 13, 14, 5, 11, 16, 15, 6, 10, 9, 8, 7],
            ],
            [
                [5, range(1, 25)],
                [1, 2, 3, 4, 5, 16, 17, 18, 19, 6, 15, 24, 25, 20, 7, 14, 23, 22, 21, 8, 13, 12, 11, 10, 9],
            ],
        ];

        runTestCases(
            cases,
            ([size, array], expected) => `${size}x${size} [${array.join(", ")}] => [${expected.join(", ")}]`,
            ([size, array], expected) => expect(spiral(array, size)).to.deep.equal(expected)
        );
    });
    describe("#getRowIndices()", () => {
        const cases: TestCases<[size: number, index: number], number[]> = [
            [
                [3, 4],
                [3, 4, 5],
            ],
            [
                [3, 0],
                [0, 1, 2],
            ],
            [
                [4, 6],
                [4, 5, 6, 7],
            ],
            [
                [4, 13],
                [12, 13, 14, 15],
            ],
            [
                [5, 2],
                [0, 1, 2, 3, 4],
            ],
            [
                [6, 7],
                [6, 7, 8, 9, 10, 11],
            ],
        ];

        runTestCases(
            cases,
            ([size, index], expected) => `${size}x${size} (${index}) => [${expected.join(", ")}]`,
            ([size, index], expected) => expect(getRowIndices(size, index)).to.deep.equal(expected)
        );
    });
    describe("#getColumnIndices()", () => {
        const cases: TestCases<[size: number, index: number], number[]> = [
            [
                [3, 4],
                [1, 4, 7],
            ],
            [
                [3, 0],
                [0, 3, 6],
            ],
            [
                [4, 6],
                [2, 6, 10, 14],
            ],
            [
                [4, 13],
                [1, 5, 9, 13],
            ],
            [
                [5, 2],
                [2, 7, 12, 17, 22],
            ],
            [
                [6, 7],
                [1, 7, 13, 19, 25, 31],
            ],
        ];

        runTestCases(
            cases,
            ([size, index], expected) => `${size}x${size} (${index}) => [${expected.join(", ")}]`,
            ([size, index], expected) => expect(getColumnIndices(size, index)).to.deep.equal(expected)
        );
    });
    describe("#getRowEdgeIndices()", () => {
        const cases: TestCases<[size: number, index: number], number[]> = [
            [
                [3, 4],
                [4, 10],
            ],
            [
                [3, 0],
                [3, 11],
            ],
            [
                [4, 6],
                [5, 14],
            ],
            [
                [4, 13],
                [7, 12],
            ],
            [
                [5, 2],
                [5, 19],
            ],
            [
                [6, 7],
                [7, 22],
            ],
        ];

        runTestCases(
            cases,
            ([size, index], expected) => `${size}x${size} (${index}) => [${expected.join(", ")}]`,
            ([size, index], expected) => expect(getRowEdgeIndices(size, index)).to.deep.equal(expected)
        );
    });
    describe("#getColumnEdgeIndices()", () => {
        const cases: TestCases<[size: number, index: number], number[]> = [
            [
                [3, 4],
                [1, 7],
            ],
            [
                [3, 0],
                [0, 8],
            ],
            [
                [4, 6],
                [2, 9],
            ],
            [
                [4, 13],
                [1, 10],
            ],
            [
                [5, 2],
                [2, 12],
            ],
            [
                [6, 7],
                [1, 16],
            ],
        ];

        runTestCases(
            cases,
            ([size, index], expected) => `${size}x${size} (${index}) => [${expected.join(", ")}]`,
            ([size, index], expected) => expect(getColumnEdgeIndices(size, index)).to.deep.equal(expected)
        );
    });
    describe("#getGridCursorFromEdgeIndex()", () => {
        const cases: TestCases<[size: number, index: number], number[]> = [
            [
                [3, 4],
                [5, -1],
            ],
            [
                [3, 11],
                [0, 1],
            ],
            [
                [4, 9],
                [14, -4],
            ],
            [
                [4, 12],
                [12, 1],
            ],
            [
                [5, 15],
                [20, 1],
            ],
            [
                [6, 20],
                [18, 1],
            ],
        ];

        runTestCases(
            cases,
            ([size, index], expected) => `${size}x${size} (${index}) => [${expected.join(", ")}]`,
            ([size, index], expected) => expect(getGridCursorFromEdgeIndex(size, index)).to.deep.equal(expected)
        );
    });
});
