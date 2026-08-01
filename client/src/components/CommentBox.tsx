import React from 'react';
import { Review } from '../hooks/useGames';
import { Box, Text, Button, Flex, Spacer, Avatar, HStack, Badge, Icon } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface Props {
    review: Review;
    userRole: string | undefined;
    onDelete: () => void;
}

const CommentBox = ({ review, onDelete, userRole }: Props) => {
    const { authorName, comment, rating } = review;

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <Box
            border="1px solid"
            borderColor="gray.700"
            borderRadius="xl"
            p={5}
            mb={4}
            bg="gray.800"
            transition="all 0.2s"
            _hover={{ borderColor: "gray.600", bg: "gray.750" }}
        >
            <Flex align="center" mb={3}>
                <HStack spacing={3}>
                    <Avatar size="sm" name={authorName} bg="purple.600" />
                    <Box>
                        <Text fontSize="md" fontWeight="bold" color="white">
                            {authorName}
                        </Text>
                    </Box>
                </HStack>
                <Spacer />
                <HStack spacing={3}>
                    <Badge colorScheme="yellow" px={2.5} py={1} borderRadius="full" display="flex" alignItems="center" gap={1}>
                        <Icon as={StarIcon} boxSize={3} />
                        <Text fontSize="xs" fontWeight="bold">{rating} / 5</Text>
                    </Badge>
                    {userRole === 'admin' && (
                        <Button colorScheme="red" variant="ghost" size="xs" onClick={handleDelete}>
                            Delete
                        </Button>
                    )}
                </HStack>
            </Flex>
            <Text fontSize="md" color="gray.200" lineHeight="relaxed">
                {comment}
            </Text>
        </Box>
    );
};

export default CommentBox;
