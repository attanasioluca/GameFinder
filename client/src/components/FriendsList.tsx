import { Badge, Box, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FriendCard from './FriendCard';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';

interface Props {
    data: string[];
    onChange: () => void;
}

const FriendsList = ({ data, onChange }: Props) => {
    const [friendList, setFriendList] = useState<string[]>([]);
    
    useEffect(() => {
        setFriendList(data || []);
    }, [data]);

    if (friendList.length === 0) {
        return (
            <VStack
                py={10}
                px={4}
                spacing={3}
                align="center"
                justify="center"
                borderRadius="xl"
                bg="gray.800"
                border="1px dashed"
                borderColor="gray.700"
                w="full"
            >
                <Icon as={FaUserPlus} boxSize={8} color="gray.500" />
                <Text color="gray.400" fontSize="sm" textAlign="center">
                    No friends added yet. Use the search bar to find and add users!
                </Text>
            </VStack>
        );
    }

    return (
        <VStack spacing={3} w="full" align="stretch">
            {friendList.map((friend) => (
                <FriendCard key={friend} onChange={onChange} friend={friend} />
            ))}
        </VStack>
    );
};

export default FriendsList;