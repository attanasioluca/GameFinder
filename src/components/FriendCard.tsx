import React from 'react'
import useUserInfo, { User } from '../hooks/useUserInfo'
import { Box } from '@chakra-ui/react'
interface Props {
    friend: string
}

const FriendCard = ({ friend }: Props) => {
    const {data, error, isLoading } = useUserInfo(friend);
  return (
    <Box>
        {data?.username}
    </Box>
  )
}

export default FriendCard