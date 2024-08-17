import { useState } from 'react';
import { IconButton, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const StarRating = () => {
  const [rating, setRating] = useState<number>(0);

  // Function to handle star click
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <HStack>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          icon={<StarIcon />}
          color={star <= rating ? 'yellow.400' : 'gray.300'}
          aria-label={`Rate ${star} stars`}
          onClick={() => handleRating(star)}
          variant="ghost"
          size="lg"
          isRound
        />
      ))}
    </HStack>
  );
};

export default StarRating;
