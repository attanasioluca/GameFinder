import useUserInfo from "../hooks/useUserInfo";
import { HStack, Text, IconButton, Avatar, Badge, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import usePost from "../hooks/usePost";
import useUserTokenInfo from "../hooks/useUserTokenInfo";

interface Props {
    friend: string;
    onChange: () => void;
}

const FriendCard = ({ friend, onChange }: Props) => {
    const { getUserInfo } = useUserInfo();
    const { data } = getUserInfo(friend);
    const { post } = usePost("http://localhost:3000/changeFriendStatus");
    const token = localStorage.getItem("token");
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData } = getUserTokenInfo(token ? token : "");

    const handleFriendRemoval = async () => {
        if (data?.id) {
            try {
                onChange();
                await post({ userId: userData?.id, friendId: data.id, add: false });
            } catch (err) {
                console.error("Error removing friend", err);
            }
        }
    };

    if (!data) return null;

    return (
        <HStack
            w="full"
            p={3}
            bg="gray.800"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.700"
            justify="space-between"
            transition="all 0.2s"
            _hover={{ borderColor: "purple.500", bg: "gray.750" }}
        >
            <HStack spacing={3}>
                <Avatar size="sm" name={data.username} bg="purple.600" />
                <Box>
                    <Text fontWeight="semibold" fontSize="sm" color="white">
                        {data.username}
                    </Text>
                    {data.user_type && (
                        <Badge
                            colorScheme={
                                data.user_type === "admin"
                                    ? "red"
                                    : data.user_type === "premium"
                                    ? "purple"
                                    : "gray"
                            }
                            borderRadius="full"
                            fontSize="10px"
                            px={2}
                        >
                            {data.user_type}
                        </Badge>
                    )}
                </Box>
            </HStack>
            <IconButton
                onClick={handleFriendRemoval}
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                aria-label="Remove friend"
                _hover={{ bg: "red.500", color: "white" }}
            />
        </HStack>
    );
};

export default FriendCard;
