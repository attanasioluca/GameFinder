import useUserInfo from "../hooks/useUserInfo";
import LoginPage from "./LoginPage";
import {
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";
import useGamesById from "../oldhooks/useGamesById";
import ProfileGameList from "./ProfileGameList";
import FriendsList from "./FriendsList";
import NavBar from "./NavBar";

interface Props {
    userId: string | null;
}

const ProfilePage = ({ userId }: Props) => {
    if (userId == null) return <LoginPage />;
    const { getUserInfo } = useUserInfo();
    const { getGamesById } = useGamesById();
    const { data, error, isLoading } = getUserInfo(userId);

    if (data) {
        const { data: gamesData, isLoading: gamesLoading } = getGamesById(
            data.games
        );
        const { data: wishlistData, isLoading: wishlistLoading } = getGamesById(
            data.wishlist
        );
        if (error) return <Text>Error loading profile</Text>;
        if (isLoading) return <Text>Loading profile...</Text>;
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
                        <Flex w="100%" alignItems="flex-start" maxW = "1900">
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
                    </VStack>
                </GridItem>
            </Grid>
        );
    }
};

export default ProfilePage;
