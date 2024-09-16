import { Game, Review } from "../hooks/useGames";
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
import useReviews from "../hooks/useReviews";

interface Props {
    onRating: () => void;
    onRatingDelete: () => void;
    game: Game;
}//

const GamePageCard = ({ onRating, onRatingDelete, game }: Props) => {
    const token = localStorage.getItem("token");
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData, error: userInfoError } = getUserTokenInfo(token? token : "");
    
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
                    gameId: review.gameId, 
            
                });
                onRatingDelete();
            } catch (err) {
                console.error("Error deleting review", err);
            }
        }
    }

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
            <NavBar onToggle={() => { } } onSearch={() => { } } showSearch={false} onPress={() => { } } searchType={false} />
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
                                        ? "rgba(255,215,0, 0.3)" 
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
                                    rating={game.metacritic}
                                />
                                <Score
                                    type={1}
                                    size={1}
                                    rating={game.rating_top}
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
                    {reviewData && reviewData.length > 0 ? (
                        reviewData.map((review) => (
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
