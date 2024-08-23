import React from "react";
import useUserInfo, { User } from "../hooks/useUserInfo";
import LoginPage from "./LoginPage";
import { HStack, Heading, Text, VStack } from "@chakra-ui/react";
import GameCard from "./GameCard";
import FriendCard from "./FriendCard";

interface Props {
    userId: string | null;
}

const ProfilePage = ({ userId }: Props) => {
    if (userId == null) return <LoginPage />;
    else {
        const { data, error, isLoading } = useUserInfo(userId);
        if (error) return <Text>Error loading profile</Text>;
        if (isLoading) return <Text>Loading profile...</Text>;
        if (data == null) return <Text>Loading...</Text>;
        else {
            console.log(data);

            return (
                <HStack>
                    <VStack>
                        <Heading>{"Welcome back, " + data.username}</Heading>
                        <VStack>
                            <Heading>I Tuoi Amici</Heading>
                            <HStack>
                                {data.friends.map((friend) => (
                                    <FriendCard friend={friend} />
                                ))}
                            </HStack>
                        </VStack>
                    </VStack>
                </HStack>
            );
        }
    }
};

export default ProfilePage;
