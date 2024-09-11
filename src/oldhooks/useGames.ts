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
    reviews: Review[]
}

export interface Review {
    author: string, // Reference to the user who posted the review (ID)
    authorName: string,
    gameId: string, // Reference to the game being reviewed
    comment: string, // The comment text
    rating: number, // The rating value
    }

export interface UseGamesResult {
  data: Game[] | null;
  isLoading: boolean;
  error: string | null;
}
const useGames = () => {
    const getGames = (query: GameQuery): UseGamesResult => {
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
    return { getGames };
}

export default useGames;
