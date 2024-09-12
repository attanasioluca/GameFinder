import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useGameInfo from "../oldhooks/UseGameInfo";
import { useState } from "react";
import RatingScreen from "./RatingScreen";
import { Box, Portal } from "@chakra-ui/react";
import usePost from "../hooks/usePost";
import useUserTokenInfo from "../hooks/useUserTokenInfo";

const GamePage = () => {
    const { gameId } = useParams();
    const [isRating, setIsRating] = useState(false);
    const {
        error: commentError,
        post: postComment
    } = usePost("http://localhost:3000/addReview");
    const { getUserTokenInfo } = useUserTokenInfo();
    const token = localStorage.getItem("token");
    console.log(token);
    const { data: userData, error: userInfoError } = getUserTokenInfo(token? token: "");
    
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
                console.log("Comment added successfully");
                setIsRating(false); // Close the rating screen after submission
            } catch (err) {
                console.error("Error adding comment", err);
            }
        }
    };

    const handleRating = () => {
        setIsRating(!isRating);
    };

    if (gameId !== undefined) {
        const { getGameInfo } = useGameInfo();
        const { data, error, isLoading } = getGameInfo(gameId);
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (data) {
            return (
                <Box display="block" flexDirection="column">
                    <GamePageCard onRating={handleRating} game={data} />
                    {isRating && (
                        <Portal>
                            <RatingScreen
                                isRating={isRating}
                                setIsRating={setIsRating}
                                onSubmitRating={handleSubmitRating} // Pass the submit handler
                            />
                        </Portal>
                    )}
                </Box>
            );
        }
    }
    return <p>Game ID is undefined</p>;
};

export default GamePage;
