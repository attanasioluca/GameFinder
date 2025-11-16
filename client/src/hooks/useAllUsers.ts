import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from './useUserInfo';

interface Res {
  data: User[] | null;
  isLoading: boolean;
  error: string | null;
}

const useAllUsers = () => {
    const getAllUsers = (id: string | undefined): Res => {
        const [data, setData] = useState<User[]>([])
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        useEffect(() => {
            const fetchUsers = async () => {
              setIsLoading(true);
              try {
                const response = await axios.get<User[]>(`http://localhost:3000/allUsers/${id}`);
                setData(response.data);
              } catch (error) {
                setError("failed to fetch user data");
              } finally {
                setIsLoading(false);
              }
            };
            fetchUsers();
          }, []);
          return { data, isLoading, error };
        };
  return { getAllUsers };
};

export default useAllUsers;