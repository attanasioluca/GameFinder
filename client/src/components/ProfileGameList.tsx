import { Box, SimpleGrid, Text, VStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { Game } from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import { FaGamepad } from 'react-icons/fa';

interface Props {
    isLoading: boolean;
    games: Game[] | null;
    gameIds: string[];
    emptyMessage?: string;
}
 
const ProfileGameList = ({ isLoading, games, gameIds, emptyMessage = "No games found in this list." }: Props) => {
    if (isLoading) {
        return (
            <VStack spacing={4} w="full">
                {gameIds.map((skeleton) => (
                    <GameCardContainer key={skeleton}>
                        <GameCardSkeleton />
                    </GameCardContainer>
                ))}
            </VStack>
        );
    }

    if (!games || games.length === 0) {
        return (
            <VStack
                py={10}
                px={4}
                spacing={3}
                align="center"
                justify="center"
                borderRadius="xl"
                bg="gray.800"
                border="1px dashed"
                borderColor="gray.700"
                w="full"
            >
                <Icon as={FaGamepad} boxSize={8} color="gray.500" />
                <Text color="gray.400" fontSize="sm" textAlign="center">
                    {emptyMessage}
                </Text>
            </VStack>
        );
    }

    return (
        <VStack spacing={4} w="full">
            {games.map((game) => (
                <Box key={game.id} w="full" transition="transform 0.2s" _hover={{ transform: "translateY(-2px)" }}>
                    <GameCardContainer>
                        <GameCard game={game} />
                    </GameCardContainer>
                </Box>
            ))}
        </VStack>
    );
};

export default ProfileGameList;