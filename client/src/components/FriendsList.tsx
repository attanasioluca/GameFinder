import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FriendCard from './FriendCard'

interface Props {
    data: string[];
    onChange: () => void;
}

const FriendsList = ({ data, onChange}: Props) => {

    const [friendList, setFriendList] = useState<string[]>([]);
    useEffect(()=>{
        setFriendList(data)
    }, [data])
    if(friendList.length === 0) 
        return (
            <Flex alignItems="center" direction="column" w="20%" borderColor={"gray.650"}
            border="2px"
            borderRadius={"40px"}>
                <Heading  padding={"40px 0px 40px 0px"}>Friends</Heading>
                <Flex 
                    padding="15px 15px 5px 15px"
                    borderColor={"gray.650"} 
                    borderWidth={"2px"}
                    borderRadius={"20px"}
                    direction="column"
                    w="90%"
                    margin="0px 10px 20px 10px"
                >
                <Text margin={"0px 0px 10px 10px"}>No friends yet. Please add some from the search bar.</Text>
                </Flex>
            </Flex>
        )
        else return (
                <Flex alignItems="center" direction="column" w="20%" borderColor={"gray.650"}
                border="2px"
                borderRadius={"40px"}>
                    <Heading  padding={"40px 0px 40px 0px"}>Friends</Heading>
                    <Flex 
                        padding="15px 15px 5px 15px"
                        borderColor={"gray.650"} 
                        borderWidth={"2px"}
                        borderRadius={"20px"}
                        direction="column"
                        w="90%"
                        margin="0px 10px 20px 10px"
                    >
                        {friendList.map((friend) => (
                            <FriendCard onChange={onChange}friend={friend} />
                        ))}
                    </Flex>
                </Flex>
    
            
  )
}

export default FriendsList