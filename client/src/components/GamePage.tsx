import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useGameInfo from "../hooks/UseGameInfo";
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
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (data) {
            return (
                <Box display="block" flexDirection="column">
                    <GamePageCard onRatingDelete={()=> {window.location.reload()}}onRating={handleRating} game={data} />
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
    return <p>Game ID is undefined</p>;
};

export default GamePage;
