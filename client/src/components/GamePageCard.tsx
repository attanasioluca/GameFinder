import { Game, Review } from "../hooks/useGames";
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    HStack,
    Heading,
    Icon,
    Image,
    Text,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import NavBar from "./NavBar";
import getCroppedImageUrl from "../services/image-url";
import { useEffect, useState } from "react";
import { AddIcon, ArrowBackIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";
import Score from "./Score";
import CommentBox from "./CommentBox";
import usePost from "../hooks/usePost";
import useGameStatus from "../hooks/useGameStatus";
import DOMPurify from "dompurify";
import { FaComments, FaHeart, FaInfoCircle } from "react-icons/fa";
import useUserTokenInfo from "../hooks/useUserTokenInfo";
import useReviews from "../hooks/useReviews";
import { useNavigate } from "react-router-dom";

interface Props {
    onRating: () => void;
    onRatingDelete: () => void;
    game: Game;
}

const GamePageCard = ({ onRating, onRatingDelete, game }: Props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData } = getUserTokenInfo(token || "");

    const { loading, error, post: postStatus } = usePost(
        "http://localhost:3000/changeGameStatus"
    );
    const { error: deleteReviewError, post: postDeleteReview } = usePost(
        "http://localhost:3000/deleteReview"
    );
    const { getReviews } = useReviews();
    const { data: reviewData, error: reviewError, isLoading: reviewLoading } = getReviews(game.id);

    const {
        data: statusData,
        error: statusError,
        isLoading: statusLoading,
    } = useGameStatus(userData?.id, game.id);

    const [inLibraryStatus, setInLibraryStatus] = useState<boolean>(false);
    const [inWishlistStatus, setInWishlistStatus] = useState<boolean>(false);

    useEffect(() => {
        if (statusData) {
            setInLibraryStatus(statusData.inCollection);
            setInWishlistStatus(statusData.inWishlist);
        }
    }, [statusData]);

    const handleGameAdd = async (type: number, add: boolean) => {
        if (game.id) {
            try {
                await postStatus({ userId: userData?.id, gameId: game.id, type, add });
            } catch (err) {
                console.error("Error adding game", err);
            }
        }
    };

    const handleReviewToggle = (review: Review) => {
        handleReviewDeletion(review);
    };

    const handleReviewDeletion = async (review: Review) => {
        if (review) {
            try {
                await postDeleteReview({
                    author: review.author,
                    gameId: review.gameId,
                });
                onRatingDelete();
            } catch (err) {
                console.error("Error deleting review", err);
            }
        }
    };

    const handleWishlistToggle = () => {
        if (inWishlistStatus) {
            handleGameAdd(2, false);
        } else {
            if (inLibraryStatus) {
                handleGameAdd(1, false);
                setInLibraryStatus(false);
            }
            handleGameAdd(2, true);
        }
        setInWishlistStatus(!inWishlistStatus);
    };

    const handleLibraryToggle = () => {
        if (inLibraryStatus) {
            handleGameAdd(1, false);
        } else {
            if (inWishlistStatus) {
                handleGameAdd(2, false);
                setInWishlistStatus(false);
            }
            handleGameAdd(1, true);
        }
        setInLibraryStatus(!inLibraryStatus);
    };

    if (statusError) {
        return <Text color="red.400" p={8}>Error loading game status</Text>;
    }

    if (deleteReviewError) {
        return <Text color="red.400" p={8}>Error deleting review</Text>;
    }

    if (error) {
        return <Text color="red.400" p={8}>Error updating library status</Text>;
    }

    if (statusLoading || loading) {
        return (
            <VStack py={20} spacing={4} bg="gray.900" minH="100vh">
                <Spinner size="xl" color="purple.500" thickness="4px" />
                <Text color="gray.400">Loading game details...</Text>
            </VStack>
        );
    }

    return (
        <Box minH="100vh" bg="gray.900" color="white">
            <NavBar
                onToggle={() => {}}
                onSearch={() => {}}
                showSearch={false}
                onPress={() => {}}
                searchType={false}
            />

            <Container maxW="1400px" py={8} px={{ base: 4, md: 8 }}>
                {/* BREADCRUMB / BACK BUTTON */}
                <Button
                    leftIcon={<ArrowBackIcon />}
                    variant="ghost"
                    color="gray.400"
                    mb={6}
                    _hover={{ color: "white", bg: "gray.800" }}
                    onClick={() => navigate("/")}
                >
                    Back to Games
                </Button>

                {/* MAIN GAME HERO CARD */}
                <Box
                    bg="gray.800"
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    mb={8}
                    boxShadow="2xl"
                >
                    <Grid templateColumns={{ base: "1fr", lg: "450px 1fr" }} gap={8} alignItems="center">
                        <Image
                            src={getCroppedImageUrl(game.background_image)}
                            alt={game.name}
                            borderRadius="xl"
                            w="full"
                            maxH="450px"
                            objectFit="cover"
                            boxShadow="lg"
                        />

                        <VStack align="flex-start" spacing={5} w="full" justify="center">
                            <VStack align="flex-start" spacing={2} w="full">
                                <Heading size="2xl" fontWeight="bold">
                                    {game.name}
                                </Heading>
                                <HStack spacing={4} pt={2} wrap="wrap">
                                    <Score type={0} size={1} rating={game.metacritic} />
                                    <Score type={1} size={1} rating={game.rating_top} />
                                </HStack>
                            </VStack>

                            <Box>
                                <Text color="gray.400" fontSize="sm" mb={2} fontWeight="semibold">
                                    PLATFORMS
                                </Text>
                                <PlatformIconList
                                    platforms={game.parent_platforms.map(
                                        (platform) => platform
                                    )}
                                />
                            </Box>

                            {/* ACTION BUTTONS */}
                            <HStack spacing={4} pt={4} wrap="wrap" w="full">
                                <Button
                                    onClick={handleLibraryToggle}
                                    colorScheme={inLibraryStatus ? "green" : "purple"}
                                    variant={inLibraryStatus ? "solid" : "solid"}
                                    leftIcon={inLibraryStatus ? <CheckIcon /> : <AddIcon />}
                                    borderRadius="xl"
                                    px={6}
                                    size="lg"
                                >
                                    {inLibraryStatus ? "In Library" : "Add to Library"}
                                </Button>

                                <Button
                                    onClick={handleWishlistToggle}
                                    colorScheme={inWishlistStatus ? "yellow" : "gray"}
                                    variant={inWishlistStatus ? "solid" : "outline"}
                                    leftIcon={inWishlistStatus ? <CheckIcon /> : <Icon as={FaHeart} color={inWishlistStatus ? "black" : "red.400"} />}
                                    borderRadius="xl"
                                    px={6}
                                    size="lg"
                                >
                                    {inWishlistStatus ? "In Wishlist" : "Wishlist"}
                                </Button>

                                {(userData?.user_type === "admin" || userData?.user_type === "premium") && (
                                    <Button
                                        variant="outline"
                                        colorScheme="purple"
                                        leftIcon={<StarIcon />}
                                        onClick={onRating}
                                        borderRadius="xl"
                                        px={6}
                                        size="lg"
                                    >
                                        Rate Game
                                    </Button>
                                )}
                            </HStack>
                        </VStack>
                    </Grid>
                </Box>

                {/* DESCRIPTION CARD */}
                <Box
                    bg="gray.800"
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    mb={8}
                    boxShadow="xl"
                >
                    <HStack spacing={3} mb={6}>
                        <Icon as={FaInfoCircle} color="purple.400" boxSize={6} />
                        <Heading size="lg">Overview</Heading>
                    </HStack>
                    <Text
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(game.description),
                        }}
                        color="gray.300"
                        fontSize="md"
                        lineHeight="tall"
                    />
                </Box>

                {/* REVIEWS CARD */}
                <Box
                    bg="gray.800"
                    border="1px solid"
                    borderColor="gray.700"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    boxShadow="xl"
                >
                    <HStack justify="space-between" mb={6}>
                        <HStack spacing={3}>
                            <Icon as={FaComments} color="purple.400" boxSize={6} />
                            <Heading size="lg">Community Reviews</Heading>
                        </HStack>
                        {reviewData && (
                            <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
                                {reviewData.length} Reviews
                            </Badge>
                        )}
                    </HStack>

                    {reviewLoading ? (
                        <Spinner color="purple.500" />
                    ) : reviewData && reviewData.length > 0 ? (
                        reviewData.map((review) => (
                            <CommentBox
                                key={review.author}
                                userRole={userData?.user_type}
                                review={review}
                                onDelete={() => {
                                    handleReviewToggle(review);
                                }}
                            />
                        ))
                    ) : (
                        <Text color="gray.400">
                            No reviews posted yet. Be the first to rate and review this game!
                        </Text>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default GamePageCard;
