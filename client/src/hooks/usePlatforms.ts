import useData from "./useData";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

const usePlatforms = () => {
    const getPlatforms = () => useData<Platform>("/platforms/lists/parents")
    return { getPlatforms };
}
export default usePlatforms;