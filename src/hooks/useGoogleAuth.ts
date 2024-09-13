
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Game } from './useGames';


interface useGoogleAuthRes {
  data: string | null;
  isLoading: boolean;
  error: string | null;
}

const useGoogleAuth = () => {

    const getGoogleAuth = (): useGoogleAuthRes => {
        const [data, setData] = useState("");
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchGames = async () => {
            setIsLoading(true);
            try {
                const response =  await axios.get<string>(`http://localhost:3000/protected`);
                setData(response.data);
            } finally {
                setIsLoading(false);
            }
            };
            fetchGames();
        }, []);
        return { data, isLoading, error };
    };
    return { getGoogleAuth };
}

export default useGoogleAuth;

