import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Status {
    inCollection: boolean,
    inWishlist: boolean,
}

export interface UseGameStatusResult {
  data: Status | null;
  isLoading: boolean;
  error: string | null;
}

const useGameStatus = (userId: string, gameId: string): UseGameStatusResult => {
    const [data, setData] = useState<Status | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGameStatus = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<Status>('http://localhost:3000/gameStatus', {
                    params: {
                        userId,
                        gameId,
                    },
                });
                
                setData({
                    inCollection: response.data.inCollection,
                    inWishlist: response.data.inWishlist
                });

            } catch (err: any) {
                setError(err.response?.data?.message || "Error fetching games");
            } finally {
                setIsLoading(false);
            }
        };
        if (userId && gameId) {
            fetchGameStatus();
        }
    }, [userId, gameId]); 

    return { data, isLoading, error };
};

export default useGameStatus;
