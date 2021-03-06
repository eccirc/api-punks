import React from "react";
import "./BeerCard.scss";

export const BeerCard = (props) => {
  const { thumb, name, sub, info, abv, year } = props;

  return (
    <div className="card">
      <img className="card__img" src={thumb} alt={"picture of" + name} />
      <h3 className="card__title">{`${name}`}</h3>
      <span className="card__sub">
        {sub} abv: {abv}%
      </span>
      <span className="card__sub">first brewed: {year}</span>

      <p className="card__info">{info}</p>
    </div>
  );
};
