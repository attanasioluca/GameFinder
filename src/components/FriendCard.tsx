import React from 'react'
import useUserInfo, { User } from '../hooks/useUserInfo'
import { Box, Flex, HStack, IconButton, Spacer } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
interface Props {
    friend: string
}

const FriendCard = ({ friend }: Props) => {
    const {getUserInfo} = useUserInfo();
    const {data, error, isLoading } = getUserInfo(friend);
    if(data){
        return (
            <Flex margin="5px">
                {data?.username} 
                <Spacer/>
                <IconButton icon={<SmallCloseIcon/>} backgroundColor="red" aria-label="RemoveFriendButton"/>
            </Flex>
        )
    }
}

export default FriendCard;