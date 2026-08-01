import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    VStack,
} from "@chakra-ui/react";
import useGamesById from "../hooks/useGamesById";
import ProfileGameList from "./ProfileGameList";
import FriendsList from "./FriendsList";
import NavBar from "./NavBar";
import useUserTokenInfo from "../hooks/useUserTokenInfo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaBookmark, FaGamepad, FaUsers } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const ProfilePage = () => {
    const userToken = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, [userToken, navigate]);

    const { getUserTokenInfo } = useUserTokenInfo();
    const { data, error, isLoading } = getUserTokenInfo(userToken || "");

    const {
        data: fetchedGames,
        isLoading: gamesLoading,
        error: gamesError,
    } = useGamesById(data ? data.games : []);

    const {
        data: fetchedWishlist,
        isLoading: wishlistLoading,
        error: wishlistError,
    } = useGamesById(data ? data.wishlist : []);

    if (error || gamesError || wishlistError)
        return (
            <Box minH="100vh" bg="gray.900">
                <NavBar
                    showSearch={false}
                    onSearch={() => {}}
                    onPress={() => {}}
                    onToggle={() => {}}
                    searchType={false}
                />
                <VStack py={20}>
                    <Text color="red.400" fontSize="lg">Error loading profile data</Text>
                </VStack>
            </Box>
        );

    if (isLoading || gamesLoading || wishlistLoading)
        return (
            <Box minH="100vh" bg="gray.900">
                <NavBar
                    showSearch={false}
                    onSearch={() => {}}
                    onPress={() => {}}
                    onToggle={() => {}}
                    searchType={false}
                />
                <VStack py={20} spacing={4}>
                    <Spinner size="xl" color="purple.500" thickness="4px" />
                    <Text color="gray.400">Loading your profile...</Text>
                </VStack>
            </Box>
        );

    if (!data) return <Text color="gray.400">No user data found</Text>;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const gamesCount = data.games?.length || 0;
    const wishlistCount = data.wishlist?.length || 0;
    const friendsCount = data.friends?.length || 0;

    return (
        <Box minH="100vh" bg="gray.900" color="white">
            <NavBar
                showSearch={false}
                onSearch={() => {}}
                onPress={() => {}}
                onToggle={() => {}}
                searchType={false}
            />

            <Container maxW="1400px" py={8} px={{ base: 4, md: 8 }}>
                {/* HERO PROFILE CARD */}
                <Box
                    bgGradient="linear(to-r, gray.800, gray.900)"
                    border="1px solid"
                    borderColor="gray.650"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    mb={8}
                    boxShadow="xl"
                >
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align={{ base: "center", md: "flex-start" }}
                        justify="space-between"
                        gap={6}
                    >
                        <HStack spacing={6} align="center" direction={{ base: "column", sm: "row" }}>
                            <Avatar
                                size="2xl"
                                name={data.username}
                                bg="purple.600"
                                border="3px solid"
                                borderColor="purple.400"
                            />
                            <VStack align={{ base: "center", sm: "flex-start" }} spacing={2}>
                                <HStack spacing={3}>
                                    <Heading size="xl" fontWeight="bold">
                                        {data.username}
                                    </Heading>
                                    <Badge
                                        colorScheme={
                                            data.user_type === "admin"
                                                ? "red"
                                                : data.user_type === "premium"
                                                ? "purple"
                                                : "blue"
                                        }
                                        fontSize="0.8em"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        textTransform="uppercase"
                                    >
                                        {data.user_type || "User"}
                                    </Badge>
                                </HStack>
                                <Text color="gray.400" fontSize="sm">
                                    Member since {data.member_since ? new Date(data.member_since).toLocaleDateString() : "2024"}
                                </Text>
                            </VStack>
                        </HStack>

                        <Flex align="center" gap={4} wrap="wrap" justify="center">
                            <HStack bg="gray.900" px={5} py={3} borderRadius="xl" border="1px solid" borderColor="gray.650" spacing={4}>
                                <Stat size="sm">
                                    <StatLabel color="gray.400">Games</StatLabel>
                                    <StatNumber color="purple.400" fontSize="xl">{gamesCount}</StatNumber>
                                </Stat>
                                <Stat size="sm">
                                    <StatLabel color="gray.400">Wishlist</StatLabel>
                                    <StatNumber color="yellow.400" fontSize="xl">{wishlistCount}</StatNumber>
                                </Stat>
                                <Stat size="sm">
                                    <StatLabel color="gray.400">Friends</StatLabel>
                                    <StatNumber color="blue.400" fontSize="xl">{friendsCount}</StatNumber>
                                </Stat>
                            </HStack>

                            <Button
                                leftIcon={<FiLogOut />}
                                colorScheme="red"
                                variant="outline"
                                onClick={handleLogout}
                                borderRadius="xl"
                                _hover={{ bg: "red.500", color: "white" }}
                            >
                                Logout
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                {/* CONTENT SECTIONS GRID */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} alignItems="start">
                    {/* FRIENDS SECTION */}
                    <Box
                        bg="gray.850"
                        border="1px solid"
                        borderColor="gray.650"
                        borderRadius="2xl"
                        p={6}
                        boxShadow="md"
                    >
                        <HStack justify="space-between" mb={6}>
                            <HStack spacing={3}>
                                <Icon as={FaUsers} color="blue.400" boxSize={5} />
                                <Heading size="md">Friends</Heading>
                            </HStack>
                            <Badge colorScheme="blue" borderRadius="full" px={3}>
                                {friendsCount}
                            </Badge>
                        </HStack>
                        <FriendsList
                            onChange={() => {
                                window.location.reload();
                            }}
                            data={data.friends}
                        />
                    </Box>

                    {/* GAMES COLLECTION SECTION */}
                    <Box
                        bg="gray.850"
                        border="1px solid"
                        borderColor="gray.650"
                        borderRadius="2xl"
                        p={6}
                        boxShadow="md"
                    >
                        <HStack justify="space-between" mb={6}>
                            <HStack spacing={3}>
                                <Icon as={FaGamepad} color="purple.400" boxSize={5} />
                                <Heading size="md">Collection</Heading>
                            </HStack>
                            <Badge colorScheme="purple" borderRadius="full" px={3}>
                                {gamesCount}
                            </Badge>
                        </HStack>
                        <ProfileGameList
                            gameIds={data.games}
                            games={fetchedGames}
                            isLoading={gamesLoading}
                            emptyMessage="Your game collection is empty. Add games from the game details page!"
                        />
                    </Box>

                    {/* WISHLIST SECTION */}
                    <Box
                        bg="gray.850"
                        border="1px solid"
                        borderColor="gray.650"
                        borderRadius="2xl"
                        p={6}
                        boxShadow="md"
                    >
                        <HStack justify="space-between" mb={6}>
                            <HStack spacing={3}>
                                <Icon as={FaBookmark} color="yellow.400" boxSize={5} />
                                <Heading size="md">Wishlist</Heading>
                            </HStack>
                            <Badge colorScheme="yellow" borderRadius="full" px={3}>
                                {wishlistCount}
                            </Badge>
                        </HStack>
                        <ProfileGameList
                            gameIds={data.wishlist}
                            games={fetchedWishlist}
                            isLoading={wishlistLoading}
                            emptyMessage="Your wishlist is empty. Bookmark games you want to play later!"
                        />
                    </Box>
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default ProfilePage;
