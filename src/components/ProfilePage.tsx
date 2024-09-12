import LoginPage from "./LoginPage";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import useGamesById from "../oldhooks/useGamesById";
import ProfileGameList from "./ProfileGameList";
import FriendsList from "./FriendsList";
import NavBar from "./NavBar";
import useUserTokenInfo from "../hooks/useUserTokenInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
    const userToken = localStorage.getItem('token');
    const navigate = useNavigate();

    // Handle navigation to login page inside useEffect to avoid interfering with render flow
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    }, [userToken, navigate]);
    const { getGamesById } = useGamesById();
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data, error, isLoading } = getUserTokenInfo(userToken? userToken: "");

    const { data: gamesData, isLoading: gamesLoading, error: gamesError} = getGamesById(//
        data ? data.games : [] 
    );
    const { data: wishlistData, isLoading: wishlistLoading, error: wishlistError } = getGamesById(
        data ? data.wishlist : []
    );//

    if (error || gamesError || wishlistError) return <Text>Error loading profile</Text>;//
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
    }
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
                    <Button onClick={handleLogout} marginBottom="20px">Logout</Button>
                </VStack>
            </GridItem>
        </Grid>
    );
};

export default ProfilePage;
