import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";
import { Game, Review } from "./useGames";
import { Platform } from "./usePlatforms";

interface FetchResponse<T> {
    id: string;
    name: string;
    description: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
    reviews: Review[];
}

const useGameInfo = (ids: string[], requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<Game[]>([]);

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);

        const fetchGames = async () => {
            try {
                // Create an array of promises for each game ID
                const requests = ids.map(id => 
                    apiClient.get<FetchResponse<any>>(`/games/${id}`, { signal: controller.signal, ...requestConfig })
                );
                
                // Wait for all requests to complete
                const responses = await Promise.all(requests);
                
                // Transform the responses into an array of Game objects
                const transformedData: Game[] = responses.map(res => ({
                    id: res.data.id,
                    name: res.data.name,
                    description: res.data.description,
                    background_image: res.data.background_image,
                    parent_platforms: res.data.parent_platforms,
                    metacritic: res.data.metacritic,
                    rating_top: res.data.rating_top,
                }));

                setData(transformedData);
            } catch (err) {
                if (err instanceof CanceledError) return;
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();

        return () => controller.abort();
    }, deps ? [...deps, ids] : [ids]);

    return { data, error, isLoading };
}

export default useGameInfo;
