import React, { useState, useEffect } from "react";

const usePunk = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("waiting");

  const fetchData = async () => {
    setStatus("fetching");
    const allBeers = [];
    for (let i = 1; i < 6; i++) {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${i}&per_page=80 `
      );
      allBeers[i] = await response.json();
    }
    setData(allBeers.flat());
    setStatus("fetched");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, status };
};

export default usePunk;
