import LoginPage from "./LoginPage";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Spinner,
    Text,//
    VStack,
} from "@chakra-ui/react";
import useGamesById from "../hooks/useGamesById";
import ProfileGameList from "./ProfileGameList";
import FriendsList from "./FriendsList";
import NavBar from "./NavBar";
import useUserTokenInfo from "../hooks/useUserTokenInfo";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Game } from "../hooks/useGames";
//
const ProfilePage = () => {
    const userToken = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!userToken) {//
            navigate("/login");
        }
    }, [userToken, navigate]);

    const { getGamesById } = useGamesById();
    const { getUserTokenInfo } = useUserTokenInfo();
    const [gamesData, setGamesData] = useState<Game[]>([]);
    const [wishlistData, setWishlistData] = useState<Game[]>([]);

    const { data, error, isLoading } = getUserTokenInfo(userToken);
    const {
        data: fetchedGames,
        isLoading: gamesLoading,
        error: gamesError,
    } = getGamesById(
        //
        data?.games
    );
    const {
        data: fetchedWishlist,
        isLoading: wishlistLoading,
        error: wishlistError,
    } = getGamesById(data?.wishlist); //

    useEffect(() => {
        if (fetchedGames) {
            setGamesData(fetchedGames);
        }
    }, [fetchedGames]);

    useEffect(() => {
        if (fetchedWishlist) {
            setWishlistData(fetchedWishlist);
        }
    }, [fetchedWishlist]);

    console.log(data);
    //

    if (error || gamesError || wishlistError)
        return <Text>Error loading profile</Text>; //
    if (isLoading || gamesLoading || wishlistLoading)
        return (
            <VStack>
                <Spinner />
                <Text>Loading profile...</Text>
            </VStack>
        );
    if (!data) return <Text>No user data found</Text>;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
            }}
            templateColumns={{
                base: "1fr",
            }}
        >
            <GridItem area="nav">
                <NavBar
                    showSearch={false}
                    onSearch={(searchText) => {}}
                    onPress={() => {}}
                    onToggle={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                    searchType={false}
                />
            </GridItem>
            <GridItem area="main">
                <VStack>
                    <Heading margin={"20px 0px 25px 0px"}>
                        {"Welcome back, " + data.username}
                    </Heading>
                    <Flex w="100%" alignItems="flex-start" maxW="1900">
                        <Spacer />
                        <FriendsList data={data.friends} />
                        <Spacer />
                        <VStack
                            w="30%"
                            borderColor={"gray.650"}
                            border="2px"
                            borderRadius={"40px"}
                        >
                            <Heading padding={"40px 0px 35px 0px"}>
                                Games
                            </Heading>
                            <ProfileGameList
                                gameIds={data.games}
                                games={gamesData}
                                isLoading={gamesLoading}
                            />
                        </VStack>
                        <Spacer />
                        <VStack
                            w="30%"
                            borderColor={"gray.650"}
                            border="2px"
                            borderRadius={"35px"}
                        >
                            <Heading padding={"40px 0px 35px 0px"}>
                                Wishlist
                            </Heading>
                            <ProfileGameList
                                gameIds={data.wishlist}
                                games={wishlistData}
                                isLoading={wishlistLoading}
                            />
                        </VStack>
                        <Spacer />
                    </Flex>
                    <Button onClick={handleLogout} marginBottom="20px">
                        Logout
                    </Button>
                </VStack>
            </GridItem>
        </Grid>
    );
};

export default ProfilePage;
