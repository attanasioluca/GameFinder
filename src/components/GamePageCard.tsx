import { Game } from "../hooks/useGames";
import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import NavBar from "./NavBar";
import getCroppedImageUrl from "../services/image-url";

interface Props {
    game: Game;
}

const GamePageCard = ({ game }: Props) => {
    console.log(game);

    return (
        <div>
            <NavBar onSearch={() => {}} showSearch={false} onPress={()=>{}} />
            <VStack>
                <HStack>
                    <Image
                        src={getCroppedImageUrl(game.background_image)}
                        maxHeight={500}
                        maxWidth={800}
                        borderRadius={15}
                        margin={5}
                    />
                    <VStack align="start">
                        <Heading>{game.name}</Heading>
                        <HStack w="full" gap={7}>
                            <Box marginTop="1">
                                <CriticScore
                                    rating={parseInt(game.metacritic)}
                                />
                            </Box>
                            <Emoji rating={parseInt(game.rating_top)} />
                        </HStack>
                        <PlatformIconList
                            platforms={game.parent_platforms.map(
                                (platform) => platform
                            )}
                        />
                    </VStack>
                </HStack>

                <Box w={1200} borderRadius={5}>
                    <Text
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        p={8}
                    />
                </Box>
            </VStack>
        </div>
    );
};

export default GamePageCard;
