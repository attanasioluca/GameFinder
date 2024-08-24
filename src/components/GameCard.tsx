import { Game } from "../oldhooks/useGames";
import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import Score from "./Score";
import useGameInfo from "../oldhooks/UseGameInfo";
interface Props {
    game: Game | null | string;
}

const GameCard = ({ game }: Props) => {
    if (!game) return null;
    if(typeof game === "string"){
        const {getGameInfo} = useGameInfo();
        const { data , isLoading, error } = getGameInfo(game);
        while (isLoading) return <p>Loading...</p>;
        if(data) return <GameCard game={data} />
    }
    else{
        return (
            <Link to={`games/${game.id}`}>
                <Card>
                    <Image src={getCroppedImageUrl(game.background_image)} />
                    <CardBody>
                        <HStack marginBottom={2} justifyContent="space-between">
                            <PlatformIconList
                                platforms={game.parent_platforms.map((p) => p)}
                            />
                            <Score
                                size={0}
                                rating={parseInt(game.metacritic)} 
                                type={0}                        />
                        </HStack>
                        <Heading fontSize="2xl">{game.name}</Heading>
                        <Emoji rating={parseInt(game.rating_top)} />
                    </CardBody>
                </Card>
            </Link>
        );
    }
};

export default GameCard;
