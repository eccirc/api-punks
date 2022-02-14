import React, { useState, useEffect } from "react";

const usePunk = (filter, page) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("waiting");

  const brewDog = `https://api.punkapi.com/v2/beers?page=${page}` + filter;

  const fetchData = async () => {
    setStatus("fetching");
    const response = await fetch(brewDog);
    const data = await response.json();
    setData(data);
    setStatus("fetched");
  };

  useEffect(() => {
    if (!filter) return;
    fetchData();
  }, [filter, page]);

  return { data, status, page };
};

export default usePunk;
