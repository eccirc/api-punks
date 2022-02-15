import React, { useEffect, useState } from "react";
import "./Pages.scss";

const Pages = (props) => {
  const { arrLength, pageNum, perPage, handleSelect, showPage } = props;

  const createPages = () => {
    let dividedPages = [];
    for (let i = 0; i < arrLength; i += perPage) {
      dividedPages.push(i);
    }
    return dividedPages.map((pageNo, index) => {
      return (
        <span
          key={index}
          className={`pages_page ${pageNo === pageNum ? "clicked" : ""}`}
          onClick={() => showPage(pageNo)}
        >
          {index + 1}
        </span>
      );
    });
  };

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const newPages = createPages();
    setPages(newPages);
  }, [perPage, arrLength, pageNum]);

  return (
    <div className="pages">
      <label htmlFor="">Per page</label>
      <select onChange={handleSelect}>
        <option value={20}>20</option>
        <option value={40}>40</option>
        <option value={80}>80</option>
        <option value={arrLength}>all</option>
      </select>
      <p>Page:</p>
      {pages}
    </div>
  );
};

export default Pages;
