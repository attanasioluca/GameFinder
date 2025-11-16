import React from 'react'
import useAllUsers from '../hooks/useAllUsers';
import { User } from '../hooks/useUserInfo';
import UserCard from './UserCard';
import { Grid, GridItem, HStack } from '@chakra-ui/react';

interface Props {
    except: string | undefined;
    onAddFriend: (id: string) => void;
}

const UsersDisplay = ({ except, onAddFriend}: Props) => {
    const { getAllUsers } = useAllUsers();
    const { data, isLoading, error } = getAllUsers(except);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users...</div>;
    }

    if (data && data.length > 0) {
        return (
            <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={6} alignContent={"center"}>
                        {data.map((user: User) => (
                            <GridItem key={user.id}>
                                <UserCard key={user.id} user={user} onAddFriend={onAddFriend}/>
                            </GridItem>
                        ))}
            </Grid>
        );
    } else {
        return <div>No results...</div>;
    }
};

export default UsersDisplay;
