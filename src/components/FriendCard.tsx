import useUserInfo from "../hooks/useUserInfo";
import { HStack, Text, IconButton, Spacer } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import usePost from "../hooks/usePost";
import useUserTokenInfo from "../hooks/useUserTokenInfo";

interface Props {
    friend: string;
    onChange: () => void;
}

const FriendCard = ({ friend, onChange }: Props) => {
    const { getUserInfo } = useUserInfo();
    const { data, error, isLoading } = getUserInfo(friend);
    const {
        data: postData,
        error: postError,
        loading,
        post,
    } = usePost("http://localhost:3000/changeFriendStatus");
    const token = localStorage.getItem("token");
    const { getUserTokenInfo } = useUserTokenInfo();
    const { data: userData, error: userInfoError } = getUserTokenInfo(token? token : "");

    const handleFriendRemoval = async () => {
        if (data?.id) {
            try {
                onChange();
                await post({ userId: userData?.id, friendId: data.id, add: false });
                console.log("Friend removed successfully");
            } catch (err) {
                console.error("Error removing friend", err);
            }
        }
    };

    if (data) {
        return (
            <HStack
                alignContent={"bottom"}
                justifyItems="end"
                margin={"0px 0px 15px 0px"}
                padding={"10px"}
                borderRadius={"14px"}
                borderWidth={"2px"}
            >
                <Text fontSize={"20px"}>{data?.username} </Text>
                <Spacer />
                <IconButton
                    onClick={handleFriendRemoval}
                    icon={<DeleteIcon />}
                    backgroundColor="red"
                    aria-label="RemoveFriendButton"
                />
            </HStack>
        );
    }
};

export default FriendCard;
