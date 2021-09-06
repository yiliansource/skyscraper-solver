/**
 * Represents a test case represented as a tuple of input and expected values.
 */
export type TestCase<TInput, TExpected> = [TInput, TExpected];
/**
 * Represents an array of test cases.
 */
export type TestCases<TInput, TExpected> = TestCase<TInput, TExpected>[];

/**
 * Runs an array of test cases with the specified name formatting and assertion behaviour.
 *
 * @param cases The cases to run.
 * @param format The formatter to give cases a title with.
 * @param assertions The lambda to run assertions (e.g. with expect()).
 */
export function runTestCases<TInput, TExpected>(
    cases: TestCases<TInput, TExpected>,
    format: (input: TInput, expected: TExpected) => string,
    assertions: (input: TInput, expected: TExpected) => void
): void {
    for (const [input, expected] of cases) {
        it(format(input, expected), () => {
            assertions(input, expected);
        });
    }
}
