import { createTheme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

const baseTheme = createTheme({});

export const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        type: "dark",
        primary: lightGreen,
    },
});
export const lightTheme = createTheme({
    ...baseTheme,
});
