import { Game } from "./useGames";

export interface User {
    id: string;
    username: string;
    member_since: Date;
    user_type: string;
    friends: User[];
    wishlist: string[]; // gameIDs
    games: string[]; // gameIDs
}