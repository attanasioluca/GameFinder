import { Game } from "../oldhooks/useGames";
import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Heading,
    Icon,
    IconButton,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import Emoji from "./Emoji";
import NavBar from "./NavBar";
import getCroppedImageUrl from "../services/image-url";
import { useEffect, useState } from "react";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import Score from "./Score";

interface Props {
    onRating: () => void;
    game: Game;
}

const GamePageCard = ({ onRating, game }: Props) => {
    const [inLibraryStatus, setInLibraryStatus] = useState<Boolean>(false);

    useEffect(() => {
        // Add - Remove the game from the database every time the user changes this property
    }, [inLibraryStatus]);

    return (
        <div>
            <NavBar onSearch={() => {}} showSearch={true} onPress={() => {}} />
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
                            <ButtonGroup
                                backgroundColor={
                                    inLibraryStatus
                                        ? "rgba(54,68,59)"
                                        : "rgba(37,37,37)"
                                }
                                isAttached
                                variant="outline"
                            >
                                <Button>
                                    {inLibraryStatus
                                        ? "In Library"
                                        : "Add to Library"}
                                </Button>
                                <IconButton
                                    onClick={() => {
                                        setInLibraryStatus(!inLibraryStatus);
                                    }}
                                    aria-label="Add to Library"
                                    icon={
                                        inLibraryStatus ? (
                                            <CheckIcon />
                                        ) : (
                                            <AddIcon />
                                        )
                                    }
                                />
                            </ButtonGroup>

                            <Button onClick={onRating}>RATE</Button>
                            <HStack>
                                <Score
                                    type={0}
                                    size={1}
                                    rating={parseInt(game.metacritic)}
                                />
                                <Score
                                    type={1}
                                    size={1}
                                    rating={parseInt(game.rating_top)}
                                />
                            </HStack>
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
