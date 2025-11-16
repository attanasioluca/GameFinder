import { useState, useEffect } from 'react';
import axios from 'axios';
import { Res, User } from './useUserTokenInfo';

const useUserUsernameInfo = () => {
    const getUserUsernameInfo = (Username: string): Res => {
        const [data, setData] = useState<User>({} as User);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        useEffect(() => {
            const fetchUsers = async () => {
              setIsLoading(true);
              try {
                const response =  await axios.get<User>(`http://localhost:3000/userByUsername/${Username}`);
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
  return { getUserUsernameInfo } ;
};
export default useUserUsernameInfo;