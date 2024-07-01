"use client";

import { FetchDataProp } from '@/types/utils';
import {fetchData} from '@/utils/http';
import { useState, useEffect} from 'react';

const useFetchData = (opts:FetchDataProp) => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [err, setErr] = useState(null);

  const fetchResponse = async () => {
    setLoading(true);
    try {
      const { data, err } = await fetchData(opts);
      if (data) {
        setData(data);
      } else {
        setErr(err);
      }
    } catch (err) {}
    setLoading(false);
  }
  
  useEffect(() => {
    fetchResponse();
  },[opts.url,opts.method,opts.body]);

  return {data,loading,err}
}


export default useFetchData;