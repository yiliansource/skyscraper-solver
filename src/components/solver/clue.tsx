import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import React from "react";

export interface ClueProps {
    value: number;
    max: number;

    onChange(v: number): void;
}

const useStyles = makeStyles((theme) => ({
    narrowButton: {
        minWidth: "30px",
        padding: "3px 4px",
    },
}));

export default function Clue({ value, max, onChange }: ClueProps): React.ReactElement {
    const classes = useStyles();
    return (
        <>
            <ButtonGroup size="small">
                <Button onClick={() => onChange(value + 1)} disabled={value >= max} className={classes.narrowButton}>
                    +
                </Button>
                {value > 0 && (
                    <Button disabled className={classes.narrowButton}>
                        {value}
                    </Button>
                )}
                {value > 0 && (
                    <Button onClick={() => onChange(value - 1)} className={classes.narrowButton}>
                        -
                    </Button>
                )}
            </ButtonGroup>
        </>
    );
}
