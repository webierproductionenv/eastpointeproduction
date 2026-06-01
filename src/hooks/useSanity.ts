import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch data from Sanity CMS.
 * Returns { data, loading, error }
 * 
 * Usage:
 *   const { data, loading } = useSanity<HomePageData>(HOME_PAGE_QUERY);
 *   // Use data with fallbacks: data?.hero?.title || "Default Title"
 */
export function useSanity<T = any>(
  query: string,
  params?: Record<string, any>
): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch<T>(query, params || {});
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[Sanity] Failed to fetch data, using fallback content:', err);
          setError(err instanceof Error ? err : new Error('Failed to fetch from Sanity'));
          // Don't clear data — keep whatever was previously loaded
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}

/**
 * Hook to fetch multiple queries at once.
 * Returns array of results in the same order as queries.
 */
export function useSanityMultiple(queries: string[]): {
  data: any[];
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<any[]>(queries.map(() => null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          queries.map((q) => sanityClient.fetch(q).catch(() => null))
        );
        if (!cancelled) {
          setData(results);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[Sanity] Failed to fetch data:', err);
          setError(err instanceof Error ? err : new Error('Failed to fetch'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(queries)]);

  return { data, loading, error };
}
