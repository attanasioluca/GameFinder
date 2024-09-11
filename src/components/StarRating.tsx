import { useState } from 'react';
import { IconButton, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface Props {
    onRatingChange: (rating: number) => void; // Prop to pass the rating back
}

const StarRating = ({ onRatingChange }: Props) => {
    const [rating, setRating] = useState<number>(0);

    const handleRating = (rate: number) => {
        setRating(rate);
        onRatingChange(rate); // Pass the selected rating back to the parent
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
