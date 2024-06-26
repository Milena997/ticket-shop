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
      const headersForFormData = {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }

          headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

      const options = {
        method,
        headers: (data instanceof FormData) ? headersForFormData : headers,
        body: data ? (data instanceof FormData ? data : JSON.stringify(data) ): null,
      };

      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
      setIsLoading(false);
      return json;
    } catch (error) {
      if( error.toString().includes('Unauthorized')) {

        localStorage.clear();
        navigate('/login');
        return null;
      }
      
      setError(error);
      setIsLoading(false);
    }
  };

  const postData = async (url, data) => {
   return  await fetchData(`${baseUrl}${url}`, 'POST', data);
  };

  const postDataFetchApi = async (url, data) => {
    let formData = new FormData();

    formData.append('eventName', data.eventName)
    formData.append('eventDate', data.eventDate)
    formData.append('eventDescription', data.eventDescription)
    formData.append('eventLocation', data.eventLocation)
    formData.append('file', data.file)
    formData.append('test', 'test')

    return  await fetchData(`${baseUrl}${url}`, 'POST', formData);
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

  return { response, error, isLoading, postData, getData, patchData, deleteData, postDataFetchApi };
};

export default useFetchAPI;
