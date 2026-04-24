// ── useInfiniteScroll Hook ────────────────────────────────────
import { useState, useCallback, useRef } from 'react';

const useInfiniteScroll = (fetchFn) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);

  const loadMore = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const currentPage = reset ? 1 : page;
      const res = await fetchFn(currentPage);
      const results = res.data.results;
      const totalPages = res.data.total_pages;

      setData(prev => reset ? results : [...prev, ...results]);
      setPage(currentPage + 1);
      setHasMore(currentPage < totalPages);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, loading, page]);

  const reset = useCallback(async () => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    await loadMore(true);
  }, [loadMore]);

  // Intersection observer for infinite scroll trigger
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadMore]);

  return { data, loading, hasMore, error, loadMore, reset, lastElementRef };
};

export default useInfiniteScroll;
