import { Box, Button, HStack, Heading, Input, Spacer, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import StarRating from "./StarRating";

interface Props {
    onSubmitRating: (rating: number, comment: string) => void; // New prop for submitting rating
    isRating: boolean;
    setIsRating: React.Dispatch<React.SetStateAction<boolean>>;
}

const RatingScreen = ({ onSubmitRating, isRating, setIsRating }: Props) => {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    const handleSubmit = () => {
        if (rating > 0) { // Ensure a rating is selected
            onSubmitRating(rating, comment);
        } else {
            console.error("Please select a rating");
        }
    };

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            backgroundColor="rgba(0, 0, 0, 0.7)"
            zIndex="1000"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
        >
            <VStack padding="60px 40px 60px 40px" spacing={15} backgroundColor={"rgba(30, 30, 30, 0.8)"} borderRadius={15}>
                <Heading marginBottom={100}>Rate the game</Heading>
                <Textarea
                    placeholder="Describe the game in less than 500 characters."
                    maxLength={500}
                    w={400}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <StarRating onRatingChange={handleRatingChange} /> {/* Pass rating handler */}
                <HStack w={300} marginTop={50}>
                    <Button onClick={() => setIsRating(false)}>Cancel</Button>
                    <Spacer />
                    <Button onClick={handleSubmit}>Submit</Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default RatingScreen;
