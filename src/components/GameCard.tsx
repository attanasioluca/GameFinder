import { Game } from "../oldhooks/useGames";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";
import Score from "./Score";
interface Props {
    game: Game | null;
}

const GameCard = ({ game }: Props) => {
    if (!game) return null;
    else {
        return (
            <Link to={`/games/${game.id}`}>
                <Card>
                    <Image src={getCroppedImageUrl(game.background_image)}/>
                    <CardBody>
                        <HStack marginBottom={2} justifyContent="space-between">
                            <PlatformIconList
                                platforms={game.parent_platforms.map((p) => p)}
                            />
                            <HStack>
                                <Score
                                    size={0}
                                    rating={parseInt(game.metacritic)}
                                    type={0}
                                />
                                <Score
                                rating={parseInt(game.rating_top)}
                                size={0}
                                type={1}/>
                            </HStack>
                        
                        </HStack>
                        <Heading fontSize="2xl">{game.name}</Heading>
                    </CardBody>
                </Card>
            </Link>
        );
    }
};

export default GameCard;
