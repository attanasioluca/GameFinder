import { useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
    id: string;
    username: string;
    member_since: Date;
    user_type: string;
    friends: string[];
    wishlist: string[]; // UserIDs
    games: string[]; // UserIDs
}

interface Res {
  data: User | null;
  isLoading: boolean;
  error: string | null;
}

const useUserTokenInfo = () => {
    const getUserTokenInfo = (token: string): Res => {
        const [data, setData] = useState<User>({} as User);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);
        useEffect(() => {
            const fetchUsers = async () => {
              setIsLoading(true);
              try {
                const response =  await axios.get<User>(`http://localhost:3000/userByToken/${token}`);
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
  return {getUserTokenInfo};
};
export default useUserTokenInfo;