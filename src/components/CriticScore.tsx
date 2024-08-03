import { Badge, Box, Button, Text } from "@chakra-ui/react";

interface Props {
    size: number;
    rating: number;
}

const CriticScore = ({ size, rating }: Props) => {
    let color = rating > 75 ? "green" : rating > 60 ? "yellow" : "red";
    if (!(rating == 0))
        return size == 0 ? (
            <Box>
                <Badge
                    fontSize="14px"
                    colorScheme={color}
                    paddingX={2}
                    borderRadius="4px"
                >
                    {rating}
                </Badge>
            </Box>
        ) : (
            <Box backgroundColor="#36443b" borderRadius="4px" padding={2}>
                <Text fontSize="14px" fontWeight="700" color="#97e1b0">
                    {rating}
                </Text>
            </Box>
        );
};

export default CriticScore;
