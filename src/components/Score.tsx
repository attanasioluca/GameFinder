import { Badge, Box, Button, Text } from "@chakra-ui/react";

interface Props {
    type: number; // 0: Critic, 1: Community
    size: number;
    rating: number;
}

const Score = ({ type, size, rating }: Props) => {

    let color = type? "rgba(67,61,50)": rating > 75 ? "rgba(54,68,59)" : rating > 60 ? "rgba(67,66,49)" : "rgba(68,55,56)";
    let textColor = type? "rgba(251,210,141)" : rating > 75 ? "rgba(150,225,176)" : rating > 60 ? "rgba(245,237,134)" : "rgba(251,176,176)"

    if (!(rating == 0))
        return size == 0 ? (
            <Box>
                <Badge
                    fontSize="14px"
                    backgroundColor= {color}
                    textColor={textColor}
                    paddingX={2}
                    borderRadius="4px"
                >
                    {rating}
                </Badge>
            </Box>
        ) : (
            <Box backgroundColor={color} borderRadius="4px" padding={2} textAlign="center" w="35px">
                <Text fontSize="14px" fontWeight="700" color= {textColor} >
                    {rating}
                </Text>
            </Box>
        );
};

export default Score;
