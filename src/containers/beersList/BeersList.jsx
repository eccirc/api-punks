import React, { useEffect, useState } from "react";
import "./BeersList.scss";
import { BeerCard } from "../../components/beerCard/BeerCard";
import logo from "../../assets/brewdog-logo.png";
import search from "../../assets/search-line.png";

export const BeersList = (props) => {
  const {
    beersArr,
    toggle,
    showPage,
    arrLength,
    pageNum,
    perPage,
    handleSelect,
  } = props;

  const allTheBeers = () => {
    return beersArr.map((beer, index) => (
      <BeerCard
        key={index}
        thumb={beer.image_url}
        name={beer.name}
        sub={beer.tagline}
        info={beer.description}
        abv={beer.abv}
        year={beer.first_brewed}
      />
    ));
  };

  const createPages = () => {
    let dividedPages = [];
    for (let i = 0; i < arrLength; i += perPage) {
      dividedPages.push(i);
    }
    console.log(dividedPages);
    return dividedPages.map((pageNo, index) => {
      return (
        <span
          key={index}
          className={`beers__pages_page ${pageNo === pageNum ? "clicked" : ""}`}
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
  }, [perPage, arrLength]);

  return (
    <div className="beers">
      <div className="beers__heading">
        <img
          onClick={toggle}
          src={search}
          alt="search for beers"
          className="beers__heading_logo"
        />
        <h2 className="beers__heading_title">PUNK API</h2>
        <img src={logo} alt="brewdog logo" className="beers__heading_logo" />
      </div>
      <div className="beers__pages">
        {" "}
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
      <div className="beers__container">{allTheBeers()}</div>
    </div>
  );
};
