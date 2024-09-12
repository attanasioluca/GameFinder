import { useEffect, useState } from "react";
import { Platform } from "../oldhooks/usePlatforms";
import { Genre } from "../oldhooks/useGenres";
import { Alert, Box, Flex, Grid, GridItem, IconButton, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import GenreList from "./GenreList";
import GameHeading from "./GameHeading";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";
import GameGrid from "./GameGrid";
import PageSelector from "./PageSelector";
import useUserInfo, { User } from "../hooks/useUserInfo";
import useUserUsernameInfo from "../hooks/useUserUsernameInfo";
import FriendCard from "./FriendCard";
import { PlusSquareIcon } from "@chakra-ui/icons";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import useUserTokenInfo from "../hooks/useUserTokenInfo";
import UsersDisplay from "./UsersDisplay";

export interface GameQuery {
    genre: Genre | null;
    platform: Platform | null;
    sortOrder: string;
    searchText: string;
    pageNumber: number;
}

const MainPage = () => {

    const userToken = localStorage.getItem('token');
    const navigate = useNavigate();

    // Handle navigation to login page inside useEffect to avoid interfering with render flow
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [userToken, navigate]);
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData} = getUserTokenInfo(userToken? userToken: "");

    const initialQuery: GameQuery = {
        genre: null,
        platform: null,
        sortOrder: "",
        searchText: "",
        pageNumber: 1,
    };
    const [gameQuery, setGameQuery] = useState<GameQuery>(initialQuery);
    const [resultLen, setResultLen] = useState(0);
    const [showFriends, setShowFriends] = useState(false);

    const { post: postFriend } = usePost("http://localhost:3000/changeFriendStatus");
    const handleFriendAdd = async (friend: string) => {
        try {
            await postFriend({ userId: userData?.username, friendId: friend, add: true });
            console.log("Friend added successfully");
        } catch (err) {
            console.error("Error adding friend", err);
        }
    };

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
                    onSearch={(searchText, searchType) => {
                        if(!searchType){
                            setGameQuery({
                                ...gameQuery,
                                searchText,
                                pageNumber: 1,
                            })
                        } else {
                            setShowFriends(true);
                        }
                    }}
                    showSearch={true}
                    onPress={() => setGameQuery(initialQuery)}
                />
                </GridItem>
            {!showFriends && 
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
            }
            {!showFriends && 
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
            }
            {showFriends && 
                <GridItem area="main">
                    <Box>
                        <UsersDisplay except={userData?.id}/>
                    </Box>
                </GridItem>
            }
        </Grid>
    );
};

export default MainPage;
