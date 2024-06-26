import { useState, useEffect } from 'react';
import useFetchAPI from '../fetchApi';

const baseUrl = process.env.BASE_URL
const useFetchAuth = () => {
    const { postData } = useFetchAPI();


    const login = (user) => {

        // postData('login', user).then((res) => {
        //     const token = JSON.stringify(res.token)
        //     const userId = JSON.stringify(res.user._id);

        //     localStorage.setItem('userId',userId )

        //     localStorage.setItem('token',token )
        //     const refreshToken = JSON.stringify(res.refreshToken)
        //     localStorage.setItem('refreshToken',refreshToken )
        //     dispatch(setAccount({
        //         username: res.user.username,
        //         email: res.user.email,
        //         userId: res.user._id
        //     }));
        //     navigate('/')
        // });
    }
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [authToken, setAuthToken] = useState(null);

//   useEffect(() => {

//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setAuthToken(storedToken);
//     }
//   }, []);

//   const fetchData = async (url, method, data = null) => {
//     setIsLoading(true);
//     try {
//       const headers = {
//         'Content-Type': 'application/json',
//       };

//           headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

//       const options = {
//         method,
//         headers,
//         body: data ? JSON.stringify(data) : null,
//       };

//       const res = await fetch(url, options);
//       const json = await res.json();
//       setResponse(json);

//       setIsLoading(false);
//       return json;
//     } catch (error) {
//       setError(error);
//       setIsLoading(false);
//     }
//   };

//   const postData = async (url, data) => {
//    return  await fetchData(`http://localhost:3001/api/v1/${url}`, 'POST', data);
//   };

//   const getData = async (url) => {
//     return await fetchData(`http://localhost:3001/api/v1/${url}`, 'GET');
//   };

//   const patchData = async (url, data) => {
//     return await fetchData(`${baseUrl}${url}`, 'PATCH', data);
//   };

//   const deleteData = async (url) => {
//     return await fetchData(`${baseUrl}${url}`, 'DELETE');
//   };

//   return { response, error, isLoading, postData, getData, patchData, deleteData };
};

export default useFetchAuth;
