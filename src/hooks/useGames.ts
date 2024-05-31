import { useState, useEffect } from 'react';
import axios from 'axios';
import { GameQuery } from "../components/MainPage";
import { Platform } from "./usePlatforms";

export interface Game {
    id: string;
    name: string;
    description: string;
    background_image: string;
    parent_platforms: {platform: Platform}[]
    metacritic: string;
    rating_top: string;
    released: string,
    added: string
}

interface UseGamesResult {
  data: Game[] | null;
  isLoading: boolean;
  error: string | null;
}

const useGames = (query: GameQuery): UseGamesResult => {
  const [data, setData] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);

      try {
        const params = {
          pageNum: query.pageNumber,
          genre: query.genre?.slug,
          platform: query.platform?.id,
          sortOrder: query.sortOrder,
          searchText: query.searchText,
        };

        // Remove keys with null or undefined values
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v != null)
        );

        const response =  await axios.get<Game[]>('http://localhost:3000/games', {
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

export default useGames;
