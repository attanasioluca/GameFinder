import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Icon, Text } from "@chakra-ui/react";

interface Props {
    type: number; // 0: Critic, 1: Community
    size: number;
    rating: number;
}

const Score = ({ type, size, rating }: Props) => {

    let color = type? "rgba(134,122,100, 0.6)": rating > 75 ? "rgba(108, 136, 118, 0.6)" : rating > 60 ? "rgba(134,122,98, 0.6)" : "rgba(136,110,112, 0.6)";
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
                    {(type==1) &&
                        <StarIcon padding={"1px"} margin={"-1px -1px 2px 1px"}color={textColor} />}
                </Badge>
            </Box>
        ) : (
            <Box backgroundColor={color} borderRadius="4px" padding={2} textAlign="center" w={type?"40px":"35px"}>
                <Text fontSize="14px" fontWeight="700" color= {textColor} >
                    {rating}
                    {(type==1) &&
                        <StarIcon padding={"1px"} margin={"-1px -1px 2px 1px"}color={textColor} />}
                </Text>
            </Box>
        );
};

export default Score;
