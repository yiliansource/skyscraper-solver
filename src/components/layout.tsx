import { Box } from "@material-ui/core";
import React from "react";

import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
    return (
        <>
            <Header />
            <Box component="main" p={2}>
                {children}
            </Box>
            <Footer />
        </>
    );
}
