import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";
import { Game } from "./useGames";
import { Platform } from "./usePlatforms";
import useData from "./useData";

interface FetchResponse<T> {
    id: string;
    name: string;
    description: string;
    background_image: string;
    parent_platforms: { platform : Platform }[]
    metacritic: number;
    rating_top: number;
}

const useGameInfo = <T>(id: string, requestConfig?: AxiosRequestConfig, deps?:any[]) => {

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Game>({id: '',
    name: '',
    description: '',
    background_image: '',
    parent_platforms: [],
    metacritic: 0,
    rating_top: 0
    });

    useEffect(() => {
        const controller = new AbortController();
        setIsLoading(true);
        apiClient
            .get<FetchResponse<T>>(`/games/${id}`, { signal: controller.signal, ...requestConfig })
            .then(res => {
                const transformedData: Game = {
                    id: res.data.id,
                    name: res.data.name,
                    description: res.data.description,
                    background_image: res.data.background_image,
                    parent_platforms: res.data.parent_platforms,
                    metacritic: res.data.metacritic,
                    rating_top: res.data.rating_top
                }
                setData(transformedData);
                setIsLoading(false);
            })
            .catch(err => {
                if(err instanceof CanceledError) return;
                setError(err.message)
                setIsLoading(false);
            });
        return () => controller.abort();
    }, deps ? [...deps] : []);
    return { data, error, isLoading };
}


export default useGameInfo;