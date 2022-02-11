import React, { useState, useEffect } from "react";

const usePunk = (filter) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("waiting");

  const brewDog = "https://api.punkapi.com/v2/beers?per_page=80" + filter;

  useEffect(() => {
    if (!filter) return;
    const fetchData = async () => {
      setStatus("fetching");
      const response = await fetch(brewDog);
      const data = await response.json();
      setData(data);
      setStatus("fetched");
    };

    fetchData();
  }, [filter]);

  return { data, status };
};

export default usePunk;