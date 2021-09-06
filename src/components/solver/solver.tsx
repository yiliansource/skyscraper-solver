import { Button, Card, CardActions, CardContent, Grid, makeStyles, Slider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Box, Flex } from "rebass";

import { solve } from "@/lib/solver/solve";

import SolverGrid from "./grid";

const useStyles = makeStyles((theme) => ({
    toolarea: {
        position: "sticky",
        top: "10px",
    },
}));

export default function Solver(): React.ReactElement {
    const [size, setSize] = useState(4);
    const [clues, setClues] = useState<number[]>([]);
    const [heights, setHeights] = useState<number[]>([]);
    const [hasSolution, setHasSolution] = useState<boolean | null>(null);

    const classes = useStyles();

    useEffect(() => {
        setClues(Array<number>(size * 4).fill(0));
        setHeights(Array<number>(size ** 2).fill(0));
    }, [size]);

    const solvePuzzle = () => {
        const solution = solve(size, clues);
        if (solution) {
            setHeights(solution);
            setHasSolution(true);
        } else {
            setHeights((h) => [...h.fill(0)]);
            setHasSolution(false);
        }
    };
    const clearAll = () => {
        setClues((c) => [...c.fill(0)]);
        setHeights((h) => [...h.fill(0)]);
        setHasSolution(null);
    };

    return (
        <>
            <Flex justifyContent="center">
                <Box>
                    <SolverGrid
                        size={size}
                        clues={clues}
                        heights={heights}
                        onClueChange={(i, h) => setClues((c) => cloneAndUpdate(c, i, h))}
                    />
                </Box>

                <Box ml={4} flex="1 0" maxWidth="600px">
                    <Card className={classes.toolarea}>
                        <CardContent>
                            <Box py={1}>
                                <Typography gutterBottom>Grid Size</Typography>
                                <Box width={200}>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Slider
                                                defaultValue={4}
                                                min={2}
                                                max={7}
                                                step={1}
                                                marks
                                                valueLabelDisplay="auto"
                                                onChangeCommitted={(e, v) => setSize(v as number)}
                                            />
                                        </Grid>
                                        <Grid item>
                                            {size}x{size}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={solvePuzzle}>
                                Solve Puzzle
                            </Button>
                            <Button variant="text" color="default" onClick={clearAll}>
                                Clear All
                            </Button>
                            {hasSolution === false && <Typography color="error">No solution found.</Typography>}
                        </CardActions>
                    </Card>
                </Box>
            </Flex>
        </>
    );
}

function cloneAndUpdate<T>(arr: T[], index: number, item: T): T[] {
    const clone = [...arr];
    clone[index] = item;
    return clone;
}
