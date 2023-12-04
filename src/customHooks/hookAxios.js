import { useState, useEffect } from 'react';
import axios from 'axios';

async function useAxios(url2, method, body) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/${url2}`;
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  const response = await axios({
    url: url,
    method: method,
    data: body,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  try {
    response;
  } catch (err) {
    return err;
  } finally {
    return response;
  }
};



export default useAxios;
