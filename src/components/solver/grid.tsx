import CssGrid from "@react-css/grid";
import React, { useMemo } from "react";
import { Box, Flex } from "rebass";

import { range } from "@/lib/collections";
import { spiral } from "@/lib/grid";

import Clue from "./clue";
import Skyscraper from "./skyscraper";

export interface SolverGridProps {
    size: number;
    clues: number[];
    heights: number[];

    onClueChange?(index: number, value: number): void;
}

export default function SolverGrid({ size, clues, heights, onClueChange }: SolverGridProps): React.ReactElement {
    const spiralLookup = useMemo(() => spiral(range(0, (size + 2) ** 2), size + 2), [size]);

    return (
        <CssGrid columns={`repeat(${size + 2}, 100px)`} gap="8px">
            {spiralLookup.map((spiral) => {
                const edge = spiralToEdgeIndex(spiral, size + 2);
                const spiralCenter = (size + 1) * 4;

                let content = <span></span>;

                if (spiral === spiralCenter) {
                    return (
                        <Box key="heights" style={{ gridArea: `2 / 2 / ${size + 2} / ${size + 2}` }}>
                            <CssGrid columns={`repeat(${size}, 100px)`} gap="8px">
                                {heights.map((h, i) => (
                                    <Skyscraper key={i} height={h} />
                                ))}
                            </CssGrid>
                        </Box>
                    );
                } else if (spiral > spiralCenter) {
                    return null;
                } else if (edge !== null) {
                    content = <Clue value={clues[edge]} max={size} onChange={(v) => onClueChange?.(edge, v)} />;
                }

                return (
                    <Flex
                        key={spiral}
                        width={100}
                        height={100}
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                    >
                        {content}
                    </Flex>
                );
            })}
        </CssGrid>
    );
}

function spiralToEdgeIndex(index: number, size: number): number | null {
    if (index % (size - 1) === 0 || index >= (size - 1) * 4) return null;
    return index - Math.ceil(index / (size - 1));
}
