import { findMin } from "../collections";

/**
 * Represents a constraint to be used in a constraint-satisfaction-problem solver.
 */
export abstract class Constraint<V, D> {
    /**
     * Initializes the constraint over a set of variables.
     */
    public constructor(public variables: V[]) {}
    /**
     * Checks if the constraint is satisfied given a change to the specified variable and the resulting,
     * current local assignment.
     *
     * @param variable The variable that has changed. This can be used to perform optimized checks by only
     * checking the affected region.
     * @param assignment The current variable assignment (state) of the solver.
     */
    public abstract satisfied(variable: V, assignment: Map<V, D>): boolean;
}

/**
 * Represents a solver instance that can be used to solve a constraint-satisfaction-problem.
 */
export class CSPSolver<V, D> {
    /**
     * The constraints to be used in the problem. Every variable has assigned constraints that need to be satisfied.
     */
    private constraints: Map<V, Constraint<V, D>[]> = new Map();

    /**
     * Initializes a new instance of a generic constraint-satisfaction-problem solver.
     *
     * @param variables The variables that need to be solved for.
     * @param domains The domains that each variable can take.
     */
    public constructor(private variables: V[], private domains: Map<V, D[]>) {
        for (const variable of this.variables) {
            // Initialize the constraint sets. By default, no variables are constrained.
            this.constraints.set(variable, []);

            if (!this.domains.has(variable)) {
                throw new Error("Every variable should have a domain assigned to it, even if it's empty.");
            }
        }
    }

    /**
     * Adds a new constraint. Variables referenced in this constraint will have it applied to it in the solver.
     */
    public addConstraint(constraint: Constraint<V, D>): void {
        for (const variable of constraint.variables) {
            if (!this.variables.includes(variable)) {
                throw new Error("Variable in constraint was not defined in the solver.");
            }

            this.constraints.get(variable)!.push(constraint);
        }
    }

    /**
     * Checks if the solver state is consistent (constraints are satisfied) given a changed variable and the changed state.
     *
     * @param variable The variable that was changed.
     * @param assignment The current state that should be tested.
     */
    public consistent(variable: V, assignment: Map<V, D>): boolean {
        for (const constraint of this.constraints.get(variable)!) {
            if (!constraint.satisfied(variable, assignment)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Invokes a recursive solving algorithm to find out matching variable states.
     *
     * @param assignment An (optional) initial state.
     */
    public solve(assignment?: Map<V, D>): Map<V, D> | null {
        return this.backtrackingSolve(assignment || new Map());
    }

    private backtrackingSolve(assignment: Map<V, D>): Map<V, D> | null {
        if (assignment.size === this.variables.length) {
            return assignment;
        }

        const selected = findMin(
            this.variables.filter((v) => !assignment.has(v)),
            (v) => this.domains.get(v)!.length
        )!;

        for (const value of this.domains.get(selected)!) {
            const local = new Map<V, D>(assignment);
            local.set(selected, value);

            if (this.consistent(selected, local)) {
                const result = this.backtrackingSolve(local);
                if (result) {
                    return result;
                }
            }
        }

        return null;
    }
}
