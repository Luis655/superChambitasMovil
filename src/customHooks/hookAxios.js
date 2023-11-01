import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url2, method, body = null) => {
  
  const url = `http://supercapi.azurewebsites.net/${url2}`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  let formdata = new FormData();
  formdata.append("email", "ccauich@blazar.com.mx");
  formdata.append("password", "123456");

  datos = {
    "email": "ccauich@blazar.com.mx",
    "password": "123456"
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url,
          method,
          data: formdata
        });
        setData(response);
        console.log(response)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
};

export default useAxios;
