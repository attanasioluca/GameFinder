import { GameQuery } from "../components/MainPage";
import useData from "./useData";
import { Platform } from "./usePlatforms";

export interface Review {
    author: string, // Reference to the user who posted the review (ID)
    authorName: string,
    gameId: string, // Reference to the game being reviewed
    comment: string, // The comment text
    rating: number, // The rating value
    }

export interface Game {
    id: string;
    name: string;
    description: string;
    background_image: string;
    parent_platforms: { platform : Platform }[]
    metacritic: number;
    rating_top: number;
    reviews: Review[]
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