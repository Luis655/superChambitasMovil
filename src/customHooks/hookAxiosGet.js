import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosGet = (url) => {
  if (!url) {
    console.error("URL is required");
    return { data: null, error: "URL is required", loading: false };
  }

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading, initialLoad };
};

export default useAxiosGet;
