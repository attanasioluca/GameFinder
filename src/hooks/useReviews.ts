import { useState, useEffect } from 'react';
import axios from 'axios';
import { Game, Review } from './useGames';


interface UseReviewsResult {
  data: Review[] | null;
  isLoading: boolean;
  error: string | null;
}

const useReviews = () => {

    const getReviews = (id: string): UseReviewsResult => {
        const [data, setData] = useState<Review[] | null>([]);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchGames = async () => {
            setIsLoading(true);
            try {
                const response =  await axios.get<Review[] | null>(`http://localhost:3000/reviews/${id}`);
                setData(response.data);
            } catch{
                throw new Error('Failed to fetch reviews');   
            }finally {
                setIsLoading(false);
            }
            };
            fetchGames();
        }, []);
        return { data, isLoading, error };
    };
    return { getReviews };
}

export default useReviews;

