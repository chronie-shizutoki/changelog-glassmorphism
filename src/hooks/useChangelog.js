import { useState, useEffect } from 'react';

export const useChangelog = () => {
  const [changelog, setChangelog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/changelog.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setChangelog(data.changelog || []);
      } catch (err) {
        console.error('Failed to fetch changelog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  const refetch = () => {
    const fetchChangelog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/changelog.json?t=' + Date.now()); // 添加时间戳避免缓存
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setChangelog(data.changelog || []);
      } catch (err) {
        console.error('Failed to fetch changelog:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  };

  return { changelog, loading, error, refetch };
};
