import React from "react";
import "./BeersList.scss";
import { BeerCard } from "../../components/beerCard/BeerCard";
import logo from "../../assets/brewdog-logo.png";
import search from "../../assets/search-line.png";

export const BeersList = (props) => {
  const { beersArr, toggle, showPage, arrLength, pageNum, perPage } = props;

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
  const pages = () => {
    let dividedPages = [];
    for (let i = 0; i < arrLength; i += perPage) {
      dividedPages.push(i);
    }
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
        <p>Page:</p>
        {pages()}
      </div>
      <div className="beers__container">{allTheBeers()}</div>
    </div>
  );
};
