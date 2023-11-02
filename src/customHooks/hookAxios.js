import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url2, method, body) => {
  
  const url = `https://supercapi.azurewebsites.net/${url2}`;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  datos = {
    "email": "ccauich@blazar.com.mx",
    "password": "123456"
  }
  useEffect(() => {
    const fetchData = async () => {
      let formdata = new FormData();
      formdata.append("email", "ccauich@blazar.com.mx");
      formdata.append("password", "123456");
      try {
        const response = await axios({
          url: url,
          method: method,
          data: body,
          headers: {
            'Content-Type': 'application/json'
          }
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
