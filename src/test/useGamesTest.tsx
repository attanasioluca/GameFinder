// src/__mocks__/useGames.ts
import { Game } from "../hooks/useGames";

const mockData: Game[] = [
    {
        id: "1",
        name: "test game",
        description: "Description",
        background_image: "image1.png",
        parent_platforms: [
            {
                platform: {
                    id: 1,
                    name: "PC",
                    slug: "pc",
                },
            },
        ],
        metacritic: 100,
        rating_top: 5,
    },
];

const useGamesTest = jest.fn();

export default useGamesTest;

export const mockUseGames = (
    data = mockData,
    isLoading = false,
    error = null
) => {
    useGamesTest.mockReturnValue({
        data,
        isLoading,
        error,
    });
};
