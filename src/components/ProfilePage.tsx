import useUserInfo, { User } from "../hooks/useUserInfo";
import LoginPage from "./LoginPage";
import { Flex, HStack, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import GameCard from "./GameCard";
import FriendCard from "./FriendCard";
import useGameInfo from "../oldhooks/UseGameInfo";
import { withScroll } from "css-box-model";

interface Props {
    userId: string | null;
}

const ProfilePage = ({ userId }: Props) => {
    if (userId == null) return <LoginPage />;
    const { getUserInfo } = useUserInfo();
    const { data, error, isLoading } = getUserInfo(userId);
    if (error) return <Text>Error loading profile</Text>;
    if (isLoading || data == null) return <Text>Loading profile...</Text>;

    return (
        <VStack backgroundColor="yellow">
            <Heading >{"Welcome back, " + data.username}</Heading>
            <Flex w="100%" backgroundColor={"green"}>
                <Spacer/>
                <Flex direction="column" backgroundColor={"red"} w="20%">
                    <Heading>Friends</Heading>
                    <Flex  backgroundColor="gray" borderColor="gray" padding="5px" borderRadius="3px" direction="column">
                        {data.friends.map((friend) => (
                            <FriendCard friend={friend} />
                        ))}
                    </Flex>
                </Flex>
                <Spacer/>
                <VStack w="35%" backgroundColor={"blue"}>
                    <Heading>Games</Heading>
                    <VStack>
                        {data.games.map((game) => (
                            <GameCard game={game} />
                        ))}
                    </VStack>
                    
                </VStack>
                <Spacer/>
                <VStack w="35%" justifyContent="start">
                    <Heading>Wishlist</Heading>
                    <VStack>
                        {data.wishlist.map((game) => (
                            <GameCard game={game} />
                        ))}
                    </VStack>
                </VStack>
                <Spacer/>
            </Flex>
        </VStack>
    );
};

export default ProfilePage;
