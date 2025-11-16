import { GameQuery } from "../components/MainPage";
import useData from "./useData";
import { Platform } from "./usePlatforms";

export interface Review {
    author: string, 
    authorName: string,
    gameId: string,
    comment: string,
    rating: number, 
    }

export interface Game {
    id: string;
    name: string;
    description: string;
    background_image: string;
    parent_platforms: { platform : Platform }[]
    metacritic: number;
    rating_top: number;
}

const useGames = (gameQuery: GameQuery) => 
    useData<Game>(`/games`, 
        { 
        params: {
            genres: gameQuery.genre?.id,
            platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
            page: gameQuery?.pageNumber
        }}, 
        [gameQuery]);

export default useGames;