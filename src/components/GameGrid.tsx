import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../oldhooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { GameQuery } from "./MainPage";

interface Props {
    gameQuery: GameQuery;
    onChange: (len: number) => void;
}

const GameGrid = ({ gameQuery, onChange}: Props) => {
    const { data, error, isLoading } = useGames(gameQuery);
    const skeletons = [1, 2, 3, 4, 5, 6];
    if (error) return <Text>{error}</Text>
    if(data != null){
        onChange(data.length)
        return (
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                spacing={6}
                paddingLeft={2}
            >
                {isLoading &&
                    skeletons.map((skeleton) => (
                        <GameCardContainer key={skeleton.toString()}>
                            <GameCardSkeleton key={skeleton} />
                        </GameCardContainer>
                    ))}
                {data.map((game) => (
                    <GameCardContainer key={game.id} >
                        <GameCard game={game}/>
                    </GameCardContainer>
                ))}
                
            </SimpleGrid>
        );}
};

export default GameGrid;
