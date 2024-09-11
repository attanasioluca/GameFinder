import { useState } from "react";

// Define types for request body and response data
export type PostResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  post: (body: any) => Promise<void>;
};

// Custom hook
const usePost = <T,>(url: string): PostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (body: any) => {
    setLoading(true);
    setError(null);
    try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const result: T = await response.json();
    setData(result);
    } catch (err) {
    setError((err as Error).message);
    } finally {
    setLoading(false);
    }
};

    return { data, loading, error, post };
};

export default usePost;
