import request from '@/api/request'
import {useReducer, useState, useEffect, dataFetchReducer} from 'react'
export const useDataApi = (initUrl, method = 'get', params = {}) => {
    const [data, setData] = useState(params);
    const [url, setUrl] = useState(initUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        console.log(data, 'state1111');
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
          const res = await request(url, method, params);
          setData(res);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchData();
    }, []);
    return [{ data, isLoading, isError }, setUrl];
  };