import { hasDuplicates } from "../collections";
import { getColumnIndices, getEdgeIndices, getGridCursorFromEdgeIndex, getRowIndices } from "../grid";
import { Constraint } from "./solver";

export class HeightConstraint extends Constraint<number, number> {
    public constructor(variables: number[], private gridSize: number) {
        super(variables);
    }
    public satisfied(variable: number, assignment: Map<number, number>): boolean {
        const row = getRowIndices(this.gridSize, variable)
            .filter((i) => assignment.has(i))
            .map((i) => assignment.get(i));
        if (hasDuplicates(row)) return false;

        const col = getColumnIndices(this.gridSize, variable)
            .filter((i) => assignment.has(i))
            .map((i) => assignment.get(i));
        if (hasDuplicates(col)) return false;

        return true;
    }
}
export class ClueConstraint extends Constraint<number, number> {
    public constructor(variables: number[], private clues: number[], private gridSize: number) {
        super(variables);
    }
    public satisfied(variable: number, assignment: Map<number, number>): boolean {
        for (const clueIndex of getEdgeIndices(this.gridSize, variable)) {
            const clue = this.clues[clueIndex];
            if (clue === 0) continue;

            const visible = this.countVisible(assignment, clueIndex);
            if (visible !== false && visible !== clue) {
                return false;
            }
        }
        return true;
    }
    private countVisible(assignment: Map<number, number>, edgeIndex: number): number | false {
        const [index, direction] = getGridCursorFromEdgeIndex(this.gridSize, edgeIndex);
        let count = 0,
            max = 0;

        for (let j = 0; j < this.gridSize && max < this.gridSize; j++) {
            const height = assignment.get(index + direction * j);
            if (height === undefined) return false;
            if (max < height) {
                count++;
                max = height;
            }
        }

        return count;
    }
}
