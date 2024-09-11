import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import { Game } from '../oldhooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';

interface Props {
    isLoading: boolean;
    games: Game[] | null;
    gameIds: string[];
};
 
const ProfileGameList = ({isLoading, games, gameIds}: Props) => {
  return (
    <VStack margin={"0px 20px 20px 20px"}>
        {isLoading &&
            gameIds.map((skeleton) => (
                <GameCardContainer
                    key={skeleton.toString()}
                >
                    <GameCardSkeleton key={skeleton} />
                </GameCardContainer>
            ))}
        {games?.map((game) => (
            <Box borderRadius={"20px"} backgroundColor="red">
                <GameCardContainer
                        key={game.id}>
                    <GameCard game={game} />
                </GameCardContainer>
            </Box>
        ))}
    </VStack>
  )
}

export default ProfileGameList