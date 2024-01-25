import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(url);
      const respJson = await resp.json();

      setData(respJson);
    };

    fetchData();
  }, [url]);

  return data;
};

export default useFetchData;
