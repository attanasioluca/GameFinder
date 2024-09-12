import { Game, Review } from "../oldhooks/useGames";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    HStack,
    Heading,
    Icon,
    IconButton,
    Image,
    Text,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import NavBar from "./NavBar";
import getCroppedImageUrl from "../services/image-url";
import { useEffect, useState } from "react";
import { AddIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";
import Score from "./Score";
import CommentBox from "./CommentBox";
import usePost from "../hooks/usePost";
import useGameStatus from "../hooks/useGameStatus";
import DOMPurify from "dompurify";
import { FaHeart } from "react-icons/fa";
import useUserTokenInfo from "../hooks/useUserTokenInfo";

interface Props {
    onRating: () => void;
    game: Game;
}

const GamePageCard = ({ onRating, game }: Props) => {
    // Fetch status and post data
    const token = localStorage.getItem("token");
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData, error: userInfoError } = getUserTokenInfo(token? token : "");
    
    const { loading, error, post: postStatus } = usePost(
        "http://localhost:3000/changeGameStatus"
    );
    const { error: deleteReviewError, post: postDeleteReview } = usePost(
        "http://localhost:3000/deleteReview"
    );

    const {
        data: statusData,
        error: statusError,
        isLoading: statusLoading,
    } = useGameStatus(userData?.id, game.id);

    // States for inLibrary and inWishlist
    const [inLibraryStatus, setInLibraryStatus] = useState<boolean>(false);
    const [inWishlistStatus, setInWishlistStatus] = useState<boolean>(false);

    // Update state when statusData is available
    useEffect(() => {
        if (statusData) {
            setInLibraryStatus(statusData.inCollection);
            setInWishlistStatus(statusData.inWishlist);
        }
    }, [statusData]);

    // Handle adding game to the library or wishlist
    const handleGameAdd = async (type: number, add: boolean) => {
        if (game.id) {
            try {
                await postStatus({ userId: userData?.id, gameId: game.id, type, add });
                console.log("Game added successfully");
            } catch (err) {
                console.error("Error adding game", err);
            }
        }
    };

    const handleReviewToggle = (review: Review) => {
        handleReviewDeletion(review);
    }

    const handleReviewDeletion = async (review: Review) => {
        if(review){
            try{
                await postDeleteReview({ 
                    author: review.author, 
                    authorName: review.authorName,
                    gameId: review.gameId, 
                    comment: review.comment, 
                    rating: review.rating,
                });
                console.log("Review deleted successfully");
            } catch (err) {
                console.error("Error deleting review", err);
            }
        }
    }

    const handleWishlistToggle = () => {
        if (inWishlistStatus) {
            // Remove game from wishlist
            handleGameAdd(2, false);
        } else {
            // Add game to wishlist
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
            // Remove game from wishlist
            handleGameAdd(1, false);
        } else {
            // Add game to wishlist
            if (inWishlistStatus) {
                handleGameAdd(2, false);
                setInWishlistStatus(false);
            }
            handleGameAdd(1, true);
        }
        setInLibraryStatus(!inLibraryStatus);
    };

    // Error or loading UI
    if (statusError) {
        return <Text>Error loading game status</Text>;
    }

    if(deleteReviewError) {
        return <Text>Error deleting review</Text>;
    }

    if (error) {
        return <Text>Error adding game to the library</Text>;
    }

    if (statusLoading || loading) {
        return <Spinner />;
    }

    return (
        <div>
            <NavBar onSearch={() => {}} showSearch={false} onPress={() => {}} />
            <VStack>
                <HStack
                    borderColor={"gray.650"}
                    border="2px"
                    w={"1200px"}
                    padding={"40px 80px 40px 40px"}
                    borderRadius={"34px"}
                    marginTop={" 20px"}
                >
                    <Image
                        src={getCroppedImageUrl(game.background_image)}
                        maxHeight={500}
                        maxWidth={800}
                        borderRadius={15}
                        margin={5}
                    />
                    <VStack align="start">
                        <Heading marginBottom={"12px"}>{game.name}</Heading>
                        <HStack w="full" gap={3}>
                            <ButtonGroup
                                backgroundColor={
                                    inLibraryStatus
                                        ? "rgba(108, 136, 118, 0.6)"
                                        : ""
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
                                    onClick={handleLibraryToggle}
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
                            <IconButton
                                backgroundColor={
                                    inWishlistStatus
                                        ? "rgba(255,215,0, 0.3)" // Gold color for wishlist
                                        : ""
                                }
                                onClick={handleWishlistToggle}
                                aria-label="Add to Wishlist"
                                variant="outline"
                                icon={
                                    inWishlistStatus ? (
                                        <CheckIcon />
                                    ) : (
                                        <Icon as={FaHeart} />
                                    )
                                }
                            />
                            {(userData?.user_type === "admin" || userData?.user_type === "premium") &&
                            <Button variant="outline" onClick={onRating}>
                                RATE
                            </Button>
                            }   
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
                        <Box marginLeft={"4px"}>
                            <PlatformIconList
                                platforms={game.parent_platforms.map(
                                    (platform) => platform
                                )}
                            />
                        </Box>
                    </VStack>
                </HStack>

                <VStack
                    borderColor={"gray.650"}
                    w={"1200px"}
                    border="2px"
                    padding={"40px 80px 40px 40px"}
                    borderRadius={"34px"}
                    marginTop={" 20px"}
                    alignItems={"trailing"}
                >
                    <Heading margin={"20px 0px 0px 32px"}> Description</Heading>
                    <Text
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(game.description),
                        }}
                        margin={"0px 32px 20px 32px"}
                    />
                </VStack>

                <VStack
                    borderColor={"gray.650"}
                    w={"1200px"}
                    border="2px"
                    padding={"40px 80px 40px 40px"}
                    borderRadius={"34px"}
                    marginTop={" 20px"}
                    alignItems={"trailing"}
                >
                    <Heading margin={"20px 0px 0px 32px"}>Reviews</Heading>
                    {game.reviews && game.reviews.length > 0 ? (
                        game.reviews.map((review) => (
                            <CommentBox userRole={userData?.user_type} key={review.author} review={review} onDelete={() =>{handleReviewToggle(review)}} />
                        ))
                    ) : (
                        <Text margin={"0px 20px 20px 32px"}>
                            No reviews yet. 
                        </Text>
                    )}
                </VStack>
            </VStack>
        </div>
    );
};

export default GamePageCard;
