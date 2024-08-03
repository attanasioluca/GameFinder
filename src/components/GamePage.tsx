import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useDataById from "../oldhooks/UseGameInfo";
import { useState } from "react";
import RatingScreen from "./RatingScreen"
import { Box } from "@chakra-ui/react";

const GamePage = () => {
    const {gameId} = useParams();
    const [isRating, setIsRating] = useState(false);
    if( gameId != undefined ) {
        const { data, error, isLoading } = useDataById(gameId);
        if (isLoading) return <p>Loading...</p>;
        else if (error) return <p>Error: {error}</p>;
        if(data)
            return (
                <view>
                    <GamePageCard onRating={()=> setIsRating(!isRating)}game={data} />
                    {isRating && <RatingScreen />}
                </view>
            );
    };
    return (
        <p>game id is undefined</p>
    )
    
};

export default GamePage;
