import { Paper, Typography } from "@material-ui/core";
import { Flex } from "rebass";

export interface SkyscraperProps {
    height: number;
}

export default function Skyscraper({ height }: SkyscraperProps): JSX.Element {
    return (
        <Paper>
            <Flex width={100} height={100} alignItems="center" justifyContent="center">
                {height > 0 && <Typography variant="h5">{height}</Typography>}
            </Flex>
        </Paper>
    );
}
