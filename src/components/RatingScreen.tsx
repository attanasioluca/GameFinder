import { Box, Button, HStack, Heading, Input, Spacer, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import StarRating from "./StarRating";

interface Props {
        onRating : () => void;
        isRating: boolean;
        setIsRating: React.Dispatch<React.SetStateAction<boolean>>;
    }

const RatingScreen = ({ onRating, isRating, setIsRating}: Props) => {

    const onSubmit = () => {
        setIsRating(false);
    }
    return (
        <Box
            position="fixed" // Fixes the position relative to the viewport
            top="0" // Aligns the Box to the top of the viewport
            left="0" // Aligns the Box to the left of the viewport
            width="100vw" // Makes the Box span the full width of the viewport
            height="100vh" // Makes the Box span the full height of the viewport
            backgroundColor="rgba(0, 0, 0, 0.7)" // Semi-transparent background
            zIndex="1000" // Ensures the Box is on top of other content
            display="flex" // Allows for centered content
            alignItems="center" // Vertically centers the content
            justifyContent="center" // Horizontally centers the content
            color="white" // Makes the text white for better contrastbackgroundColor="red" >
        >

            <VStack padding="60px 40px 60px 40px" spacing={15} backgroundColor={"rgba(30, 30, 30, 0.8)"} borderRadius={15}>
                <Heading marginBottom={100}>Rate the game</Heading>
                <Textarea placeholder="Describe the game in less than 500 characters." maxLength={500} w={400}></Textarea>
                <StarRating />
                <HStack w={300} marginTop={50}>
                    <Button onClick={() => {setIsRating(false)}}>Cancel</Button>
                    <Spacer />
                    <Button onClick={onSubmit}>Submit</Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default RatingScreen;
