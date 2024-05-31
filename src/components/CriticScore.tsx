import { Badge } from '@chakra-ui/react'

interface Props {
    rating: number
}

const CriticScore = ({rating}: Props) => {
    let color = rating >75? "green" : rating > 60 ? "yellow" : "red";
    if (!(rating==0)) return (
        <Badge fontSize="14px" colorScheme={color} paddingX={2} borderRadius="4px">{rating}</Badge>
    )
}

export default CriticScore