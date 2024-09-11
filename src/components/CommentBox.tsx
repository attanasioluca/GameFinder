import React from 'react'
import { Review } from '../oldhooks/useGames';
import { Box, Text, Button, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { USERROLE } from '../data/USER_DATA';


interface Props{
    review: Review;
    onDelete: () => void;
}

// CommentBox component
const CommentBox = ({ review, onDelete }: Props) => {
  const { author, authorName, gameId, comment, rating } = review;

  // Handle delete button click
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  // Dynamic background color based on color mode (light/dark)
  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box 
      border="1px" 
      borderColor="gray.300" 
      borderRadius="md" 
      p={4} 
      mb={4} 
      bg={bg}
    >
      <Flex align="center">
        <Text fontSize="lg" fontWeight="bold">{authorName} says:</Text>
        <Spacer />
        {USERROLE === 'admin' && (
          <Button colorScheme="red" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Flex>
      <Text mt={2} fontSize="md">{comment}</Text>
      <Text mt={2} fontSize="sm" color="gray.500">Rating: {rating} stars</Text>
    </Box>
  );
};

export default CommentBox;
