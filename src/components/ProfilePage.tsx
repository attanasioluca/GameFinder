import useUserInfo, { User } from "../hooks/useUserInfo";
import LoginPage from "./LoginPage";
import { Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import GameCard from "./GameCard";
import FriendCard from "./FriendCard";
import useGamesById from "../oldhooks/useGamesById";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
    userId: string | null;
}

const ProfilePage = ({ userId }: Props) => {
    if (userId == null) return <LoginPage />;
    const { getUserInfo } = useUserInfo();
    const { getGamesById } = useGamesById();
    const { data, error, isLoading } = getUserInfo(userId);
    if (data) {
        const {
            data: gamesData,
            isLoading: gamesLoading
        } = getGamesById(data.games);
        const {
            data: wishlistData,
            isLoading: wishlistLoading
        } = getGamesById(data.wishlist);
        if (error) return <Text>Error loading profile</Text>;
        if (isLoading) return <Text>Loading profile...</Text>;
        return (
            <VStack backgroundColor="yellow">
                <Heading>{"Welcome back, " + data.username}</Heading>
                <Flex w="100%" backgroundColor={"green"}>
                    <Spacer />
                    <Flex direction="column" backgroundColor={"red"} w="20%">
                        <Heading>Friends</Heading>
                        <Flex
                            backgroundColor="gray"
                            borderColor="gray"
                            padding="5px"
                            borderRadius="3px"
                            direction="column"
                        >
                            {data.friends.map((friend) => (
                                <FriendCard friend={friend} />
                            ))}
                        </Flex>
                    </Flex>
                    <Spacer />
                    <VStack w="35%" backgroundColor={"blue"}>
                        <Heading>Games</Heading>
                        <VStack>
                            {gamesLoading &&
                                data.games.map((skeleton) => (
                                    <GameCardContainer
                                        key={skeleton.toString()}
                                    >
                                        <GameCardSkeleton key={skeleton} />
                                    </GameCardContainer>
                                ))}
                            {gamesData?.map((game) => (
                                <GameCardContainer 
                                        key={game.id}>
                                    <GameCard game={game} />
                                </GameCardContainer>
                            ))}
                        </VStack>
                    </VStack>
                    <Spacer />
                    <VStack w="35%">
                        <Heading>Wishlist</Heading>
                        <VStack>
                            {wishlistLoading &&
                                data.wishlist.map((skeleton) => (
                                    <GameCardContainer
                                        key={skeleton.toString()}
                                    >
                                        <GameCardSkeleton key={skeleton} />
                                    </GameCardContainer>
                                ))}
                            {wishlistData?.map((game) => (
                                <GameCardContainer key={game.id}>
                                    <GameCard game={game} />
                                </GameCardContainer>
                            ))}
                        </VStack>
                    </VStack>
                    <Spacer />
                </Flex>
            </VStack>
        );
    }
};

export default ProfilePage;
