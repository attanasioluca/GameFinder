import React, { useState } from 'react';
import { Box, Flex, Text, Button, VStack, Grid, GridItem, ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { User } from '../hooks/useUserTokenInfo';
import { CheckIcon, PlusSquareIcon } from '@chakra-ui/icons';

interface Props {
  user: User;
  onAddFriend: (user: string) => void;

}

const UserCard= ({ user, onAddFriend }: Props) => {

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={4} 
      shadow="md" 
      w="100%" 
      maxW="md"
    >
            <Text fontSize="xl" fontWeight="bold">
            {user.username}
            </Text>
            <Text fontSize="sm" color="gray.500">
            {user.user_type}
            </Text>
            <Flex justify="flex-end" w="100%">
                <Button size="sm" 
                onClick={() => onAddFriend(user.id)}>
                    + Add Friend 
                </Button>
            </Flex>

    </Box>
  );
};

export default UserCard;
