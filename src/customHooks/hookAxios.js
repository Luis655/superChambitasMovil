import { useState, useEffect } from 'react';
import axios from 'axios';

async function useAxios (url2, method, body = null) {


  const url = `http://localhost:5270/${url2}`;
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

      const response = await axios({
        url: url,
        method: method,
    
      });
      

      try {
        response;
        //console.log(response.data)
      } catch (err) {
        return err;
      } finally {
        return response;
      } 
};

export default useAxios;
