import { Game } from "../oldhooks/useGames";
import { Box, Button, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import NavBar from "./NavBar";
import getCroppedImageUrl from "../services/image-url";
import { useState } from "react";

interface Props {
    onRating : () => void;
    game: Game;
}

const GamePageCard = ({ onRating, game }: Props) => {
    console.log(game);
    const [inLibraryStatus, setInLibraryStatus] = useState(false);
    return (
        <div>
            <NavBar onSearch={() => {}} showSearch={true} onPress={()=>{}} />
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
                        <HStack w="full" gap={3}>
                            <Box>
                                <CriticScore size={1} rating={parseInt(game.metacritic)}/>
                            </Box>
                            <Button onClick={()=> {setInLibraryStatus(!inLibraryStatus)}}>{inLibraryStatus?"V":"+"}</Button>
                            <Button onClick={onRating}>RATE</Button>
                            <Box marginBottom={1}>
                                <Emoji rating={parseInt(game.rating_top)} />
                            </Box>
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
