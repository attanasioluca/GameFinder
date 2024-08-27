import { useState, useEffect } from 'react';
import axios from 'axios';
import { Game, UseGamesResult } from './useGames';

const useGamesById = () => {
    const getGamesById = (query: string[]): UseGamesResult => {
    const [data, setData] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
        setIsLoading(true);

        try {
            const params = {
                ids: query
            };
            const filteredParams = Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v != null)
                );
            const response =  await axios.get<Game[]>('http://localhost:3000/gamesById', {
            params: filteredParams
            });
            setData(response.data);
        }catch{
            setError("Error fetching games")
        } finally {
            setIsLoading(false);
        }
        };
        fetchGames();
    }, [query]);
    return { data, isLoading, error };
    };
    return { getGamesById };
}

export default useGamesById;
