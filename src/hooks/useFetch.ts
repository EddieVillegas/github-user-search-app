import { useState, useEffect } from 'react';

type FetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export default function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                setData(null)
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        if(url) fetchData();
    }, [url]);
    
    return { data, error, loading };
}