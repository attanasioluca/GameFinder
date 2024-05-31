import { useParams } from "react-router-dom";
import GamePageCard from "./GamePageCard";
import useDataById from "../hooks/UseGameInfo";

const GamePage = () => {
    const {gameId} = useParams();
    if( gameId != undefined ) {
        const { data, error, isLoading } = useDataById(gameId);
        if (isLoading) return <p>Loading...</p>;
        else if (error) return <p>Error: {error}</p>;
        else if(data)
            return (
                <div>
                    <GamePageCard game={data} />
                </div>
            );
    };
    return (
        <p>game id is undefined :(</p>
    )
    
};

export default GamePage;
