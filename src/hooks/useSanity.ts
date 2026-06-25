import { useState, useEffect } from 'react';
import { sanityClient } from '../lib/sanity';

// Global cache to prevent duplicate network requests across different components.
const queryCache = new Map<string, Promise<any>>();

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
      const cacheKey = `${query}-${JSON.stringify(params || {})}`;

      try {
        setLoading(true);

        // Check if there is an ongoing or resolved promise for this exact query
        if (!queryCache.has(cacheKey)) {
          // If not, create a new promise and store it in the cache immediately
          const promise = sanityClient.fetch<T>(query, params || {});
          queryCache.set(cacheKey, promise);
        }

        // Await the promise (either freshly created or from the cache)
        const result = await queryCache.get(cacheKey);

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('[Sanity] Failed to fetch data, using fallback content:', err);
          setError(err instanceof Error ? err : new Error('Failed to fetch from Sanity'));
        }
        // Optional: Remove failed promise from cache so it retries next time
        queryCache.delete(cacheKey);
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
          queries.map((q) => {
            const cacheKey = `${q}-{}`;
            if (!queryCache.has(cacheKey)) {
              const promise = sanityClient.fetch(q).catch(() => null);
              queryCache.set(cacheKey, promise);
            }
            return queryCache.get(cacheKey);
          })
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
