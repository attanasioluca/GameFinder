import { useEffect, useState } from "react";
import axios from "axios";

export interface Genre {
    id: string;
    name: string;
    slug: string;
    image_background: string;
}

interface UseGenresResult {
    data: Genre[] | null;
    error: string | null;
  }
  
const useGenres = () => {
    const getGenres = (): UseGenresResult => {
        const [data, setData] = useState<Genre[]>([]);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
        const fetchGenres = async () => {
    
            try {
            const response =  await axios.get<Genre[]>('http://localhost:3000/genres');
            setData(response.data);
            }catch{
                setError("Error");
            }
        };
        fetchGenres();
        }, []);
        return { data, error };
    };
    return { getGenres };
}
  
  export default useGenres;