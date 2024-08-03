import {
    Button,
    HStack,
    Heading,
    Image,
    List,
    ListItem,
} from "@chakra-ui/react";
import useGenres from "../oldhooks/useGenres";
import { Genre } from "../oldhooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
    onClick: (genre: Genre | null) => void;
    selectedGenre: Genre | null;
}

const GenreList = ({ onClick, selectedGenre }: Props) => {
    const { data, error } = useGenres();
    if (error) return null;
    if(data){
        return (
            <>
                <Heading fontSize="2xl" marginBottom={3}>Genres</Heading>
                <List>
                    <ListItem key={"allgenres"} paddingY="5px">
                        <Button
                            fontWeight={
                                selectedGenre == null
                                    ? "bold"
                                    : "normal"
                            }
                            color={
                                selectedGenre == null
                                    ? "white"
                                    : "gray"
                            }
                            whiteSpace="normal"
                            textAlign="left"
                            onClick={() => onClick(null)}
                            variant="link"
                            fontSize="lg"
                        >
                        All genres
                        </Button>
                    </ListItem>
                    {data.map((genre: Genre) => (
                        <ListItem key={genre.id} paddingY="5px">
                            <HStack>
                                <Image
                                    borderRadius={8}
                                    boxSize="32px"
                                    objectFit="cover"
                                    src={getCroppedImageUrl(genre.image_background)}
                                />
                                <Button
                                    fontWeight={
                                        genre.id === selectedGenre?.id
                                            ? "bold"
                                            : "normal"
                                    }
                                    color={
                                        genre.id === selectedGenre?.id
                                        ? "white"
                                        : "gray"
                                    }
                                    whiteSpace="normal"
                                    textAlign="left"
                                    onClick={() => onClick(genre)}
                                    variant="link"
                                    fontSize="lg"
                                >
                                    {genre.name}
                                </Button>
                            </HStack>
                        </ListItem>
                    ))}
                </List>
            </>
        );
    }
};

export default GenreList;
