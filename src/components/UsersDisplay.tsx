import React from 'react'
import useAllUsers from '../hooks/useAllUsers';
import { User } from '../hooks/useUserInfo';

interface Props{
    except: string | undefined
}

const UsersDisplay = ({ except }: Props) => {
    const { getAllUsers } = useAllUsers();
    const { data, isLoading, error } = getAllUsers(except);
    if(data){
        return (
                data.map((user: User) => {
                    user.username
                })
        )
    }
}

export default UsersDisplay