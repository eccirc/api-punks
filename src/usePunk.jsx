import React, { useState, useEffect } from "react";

const usePunk = (url) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setStatus("fetched");
    };

    fetchData();
  }, [url]);

  return { data, status };
};

export default usePunk;
