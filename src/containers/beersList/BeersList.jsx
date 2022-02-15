import React, { useEffect, useState } from "react";
import "./BeersList.scss";
import { BeerCard } from "../../components/beerCard/BeerCard";
import logo from "../../assets/brewdog-logo.png";
import search from "../../assets/search-line.png";
import Pages from "../../components/pages/Pages";

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
      <Pages
        arrLength={arrLength}
        pageNum={pageNum}
        perPage={perPage}
        handleSelect={handleSelect}
        showPage={showPage}
      />
      <div className="beers__container">{allTheBeers()}</div>
    </div>
  );
};
