import React from "react";
import "./BeersList.scss";
import { BeerCard } from "../../components/beerCard/BeerCard";

/*

Beer Data:

name": "Buzz",
      "tagline": "A Real Bitter Experience.",
      "first_brewed": "09/2007",
      "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
      "image_url": "https://images.punkapi.com/v2/keg.png",
      "abv": 4.5,

*/

export const BeersList = (props) => {
  const { beersArr } = props;

  const allTheBeers = () => {
    return beersArr.map((beer, index) => (
      <BeerCard
        key={index}
        thumb={beer.image_url}
        name={beer.name}
        sub={beer.tagline}
        info={beer.description}
      />
    ));
  };

  return (
    <div className="beers">
      <h2>PUNK API</h2>
      <div className="beers__container">{allTheBeers()}</div>
    </div>
  );
};
