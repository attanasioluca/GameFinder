import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useDataById from "../oldhooks/UseGameInfo";
import { useState } from "react";
import RatingScreen from "./RatingScreen";
import { Box, Portal } from "@chakra-ui/react";

const GamePage = () => {
    const { gameId } = useParams();
    const [isRating, setIsRating] = useState(false);

    if (gameId !== undefined) {
        const { data, error, isLoading } = useDataById(gameId);
        if (isLoading) return <p>Loading...</p>;
        else if (error) return <p>Error: {error}</p>;
        if (data) {
            return (
                <Box display="block" flexDirection="column">
                    <GamePageCard onRating={() => setIsRating(!isRating)} game={data} />
                    {isRating && (
                        <Portal>
                            <RatingScreen isRating={isRating} setIsRating={setIsRating} onRating={()=>{}}/>
                        </Portal>
                    )}
                </Box>
            );
        }
    }
    return <p>game id is undefined</p>;
};

export default GamePage;
