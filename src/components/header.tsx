import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function Header(): React.ReactElement {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Skyscraper Solver</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
