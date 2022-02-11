import React from "react";
import "./BeersList.scss";
import { BeerCard } from "../../components/beerCard/BeerCard";
import logo from "../../assets/brewdog-logo.png";
import search from "../../assets/search-line.png";

export const BeersList = (props) => {
  const { beersArr, toggle, showPage } = props;

  const allTheBeers = () => {
    return beersArr.map((beer, index) => (
      <BeerCard
        key={index}
        thumb={beer.image_url}
        name={beer.name}
        sub={beer.tagline}
        info={beer.description}
        abv={beer.abv}
      />
    ));
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
        <span onClick={() => showPage(1)}>1</span>
        <span onClick={() => showPage(2)}>2</span>
        <span onClick={() => showPage(3)}>3</span>
        <span onClick={() => showPage(4)}>4</span>
      </div>
      <div className="beers__container">{allTheBeers()}</div>
    </div>
  );
};
