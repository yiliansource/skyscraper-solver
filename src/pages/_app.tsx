import { CssBaseline, ThemeProvider, useMediaQuery } from "@material-ui/core";
import type { AppProps } from "next/app";
import React from "react";

import { darkTheme, lightTheme } from "@/lib/theme";

import Layout from "../components/layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
    const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Layout>
                <Component {...pageProps} />{" "}
            </Layout>
        </ThemeProvider>
    );
}
