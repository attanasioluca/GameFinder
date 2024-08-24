import { useEffect, useState } from "react";
import axios from "axios";

export interface Platform {
    id: string;
    name: string;
    slug: string;
}

interface UsePlatformResult {
    data: Platform[] | null;
    error: string | null;
}
const usePlatforms = () => {
    const getPlatforms = (): UsePlatformResult => {
        const [data, setData] = useState<Platform[]>([]);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
        const fetchPlatforms = async () => {
    
            try {
            const response =  await axios.get<Platform[]>('http://localhost:3000/platforms');
            setData(response.data);
            }catch{
                setError("Error")
            }
        };
        fetchPlatforms();
        }, []);
        return {data, error};
    };
    return { getPlatforms };
}
  
  export default usePlatforms;