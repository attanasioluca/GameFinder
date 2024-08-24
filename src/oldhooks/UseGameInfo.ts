import { useState, useEffect } from 'react';
import axios from 'axios';
import { Game } from './useGames';


interface UseGamesResult {
  data: Game | null;
  isLoading: boolean;
  error: string | null;
}

const useGameInfo = () => {

    const getGameInfo = (id: string): UseGamesResult => {
        const [data, setData] = useState<Game>({} as Game);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchGames = async () => {
            setIsLoading(true);
            try {
                const response =  await axios.get<Game>(`http://localhost:3000/games/${id}`);
                setData(response.data);
            } finally {
                setIsLoading(false);
            }
            };
            fetchGames();
        }, []);
        return { data, isLoading, error };
    };
    return { getGameInfo };
}

export default useGameInfo;
