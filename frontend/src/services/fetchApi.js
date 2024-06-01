import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL
const useFetchAPI = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);
  const fetchData = async (url, method, data = null) => {
   
    if(JSON.parse(localStorage.getItem('token')) === null) {
      navigate('/login')
    }
    setIsLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

          headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

      const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      };

      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
      setIsLoading(false);
      return json;
    } catch (error) {
      if( error.toString().includes('Unauthorized')) {

        localStorage.clear();
        navigate('/login')
        return;
      }
      
      setError(error);
      setIsLoading(false);
    }
  };

  const postData = async (url, data) => {
   return  await fetchData(`${baseUrl}${url}`, 'POST', data);
  };

  const getData = async (url) => {
    return await fetchData(`${baseUrl}${url}`, 'GET');
  };

  const patchData = async (url, data) => {
    return await fetchData(`${baseUrl}${url}`, 'PATCH', data);
  };

  const deleteData = async (url) => {
    return await fetchData(`${baseUrl}${url}`, 'DELETE');
  };

  return { response, error, isLoading, postData, getData, patchData, deleteData };
};

export default useFetchAPI;
