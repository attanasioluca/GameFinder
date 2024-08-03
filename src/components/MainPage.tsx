import { useState } from "react";
import { Platform } from "../oldhooks/usePlatforms";
import { Genre } from "../oldhooks/useGenres";
import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import GenreList from "./GenreList";
import GameHeading from "./GameHeading";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import GameGrid from "./GameGrid";
import PageSelector from "./PageSelector";

export interface GameQuery {
    genre: Genre | null;
    platform: Platform | null;
    sortOrder: string;
    searchText: string;
    pageNumber: number;
}

const MainPage = () => {
    const initialQuery: GameQuery = {
        genre: null,
        platform: null,
        sortOrder: "",
        searchText: "",
        pageNumber: 1,
    };
    const [gameQuery, setGameQuery] = useState<GameQuery>(initialQuery);
    const [resultLen, setResultLen] = useState(0);

    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                md: `"nav nav" "aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                md: "200px 1fr",
            }}
        >
            <GridItem area="nav">
                <NavBar
                    showSearch={true}
                    onSearch={(searchText) =>
                        setGameQuery({
                            ...gameQuery,
                            searchText,
                            pageNumber: 1,
                        })
                    }
                    onPress={() => setGameQuery(initialQuery)}
                />
            </GridItem>
            <Show above="md">
                <GridItem area="aside" paddingX={5}>
                    <GenreList
                        selectedGenre={gameQuery.genre}
                        onClick={(genre) =>
                            setGameQuery({ ...gameQuery, genre, pageNumber: 1 })
                        }
                    />
                </GridItem>
            </Show>
            <GridItem area="main">
                <Box paddingLeft={2}>
                    <GameHeading gamequery={gameQuery} />
                    <Flex marginBottom={5}>
                        <Box marginRight={5}>
                            <PlatformSelector
                                selectedPlatform={gameQuery.platform}
                                onSelectedPlatform={(platform) =>
                                    setGameQuery({
                                        ...gameQuery,
                                        platform,
                                        pageNumber: 1,
                                    })
                                }
                            />
                        </Box>
                        <SortSelector
                            selectedSortOrder={
                                gameQuery.sortOrder.split(":")[0]
                            }
                            onSelectSortOrder={(sortOrder) =>
                                setGameQuery({
                                    ...gameQuery,
                                    sortOrder,
                                    pageNumber: 1,
                                })
                            }
                        />
                    </Flex>
                </Box>
                <GameGrid
                    onChange={(len) => setResultLen(len)}
                    gameQuery={gameQuery}
                />
                <PageSelector
                    resultLen={resultLen}
                    selectedPage={gameQuery.pageNumber}
                    onSelectedPage={(pageNumber) =>
                        setGameQuery({ ...gameQuery, pageNumber })
                    }
                />
            </GridItem>
        </Grid>
    );
};

export default MainPage;
