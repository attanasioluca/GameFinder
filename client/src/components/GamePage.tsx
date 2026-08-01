import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useGameInfo from "../hooks/UseGameInfo";
import { useState } from "react";
import RatingScreen from "./RatingScreen";
import { Box, Portal, Spinner, Text, VStack } from "@chakra-ui/react";
import usePost from "../hooks/usePost";
import useUserTokenInfo from "../hooks/useUserTokenInfo";

const GamePage = () => {
    const { gameId } = useParams();
    const [isRating, setIsRating] = useState(false);
    const {
        post: postComment
    } = usePost("http://localhost:3000/addReview");
    const { getUserTokenInfo } = useUserTokenInfo();
    const token = localStorage.getItem("token");
    const { data: userData } = getUserTokenInfo(token ? token : "");

    const handleSubmitRating = async (rating: number, comment: string) => {
        if (gameId && userData) {
            try {
                await postComment({
                    author: userData.id,
                    authorName: userData.username,
                    gameId: gameId,
                    comment: comment,
                    rating: rating,
                });
                setIsRating(false);
                window.location.reload();
            } catch (err) {
                console.error("Error adding comment", err);
            }
        }
    };

    const handleRating = () => {
        setIsRating(!isRating);
    };

    if (gameId !== undefined) {
        const { data, error, isLoading } = useGameInfo(gameId);
        if (isLoading)
            return (
                <VStack py={20} bg="gray.900" minH="100vh" justify="center">
                    <Spinner size="xl" color="purple.500" thickness="4px" />
                    <Text color="gray.400" mt={4}>Loading game details...</Text>
                </VStack>
            );
        if (error)
            return (
                <VStack py={20} bg="gray.900" minH="100vh" justify="center">
                    <Text color="red.400" fontSize="lg">Error: {error}</Text>
                </VStack>
            );
        if (data) {
            return (
                <Box minH="100vh" bg="gray.900">
                    <GamePageCard
                        onRatingDelete={() => {
                            window.location.reload();
                        }}
                        onRating={handleRating}
                        game={data}
                    />
                    {isRating && (
                        <Portal>
                            <RatingScreen
                                isRating={isRating}
                                setIsRating={setIsRating}
                                onSubmitRating={handleSubmitRating}
                            />
                        </Portal>
                    )}
                </Box>
            );
        }
    }

    return (
        <VStack py={20} bg="gray.900" minH="100vh" justify="center">
            <Text color="gray.400">Game ID is undefined</Text>
        </VStack>
    );
};

export default GamePage;
