import { expect } from "chai";

import { findMin, hasDuplicates, range } from "@/lib/collections";

import { runTestCases, TestCases } from "./helpers";

describe("collection utilities", () => {
    describe("#findMin()", () => {
        const cases: TestCases<number[], number | undefined> = [
            [[], undefined],
            [[1, 2, 3, 4, 5], 1],
            [[23, 6, 2, 12, 5, 6], 2],
            [[-5, -10, 20, 30, 1], -10],
        ];

        runTestCases(
            cases,
            (input, expected) => `[${input.join(", ")}] => ${expected}`,
            (input, expected) => expect(findMin(input, (x) => x)).to.equal(expected)
        );
    });
    describe("#hasDuplicates()", () => {
        const cases: TestCases<unknown[], boolean> = [
            [[], false],
            [[1], false],
            [[1, 2, 3, 4], false],
            [[1, 1, 2, 3, 4, 5], true],
            [["x", "y", "z", "x", "a", "b"], true],
            [["a", "b", "c", "d", "e"], false],
        ];

        runTestCases(
            cases,
            (input, expected) => `[${input.join(", ")}] => ${expected}`,
            (input, expected) => expect(hasDuplicates(input)).to.equal(expected)
        );
    });
    describe("#range()", () => {
        const cases: TestCases<[start: number, end: number], number[]> = [
            [
                [1, 3],
                [1, 2, 3],
            ],
            [
                [0, 5],
                [0, 1, 2, 3, 4, 5],
            ],
            [
                [2, 8],
                [2, 3, 4, 5, 6, 7, 8],
            ],
        ];

        runTestCases(
            cases,
            ([start, end], expected) => `${start}-${end} => [${expected}]`,
            ([start, end], expected) => expect(range(start, end)).to.deep.equal(expected)
        );
    });
});
