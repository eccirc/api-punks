import React from "react";
import "./Nav.scss";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { FilterItem } from "../../components/filterItem/FilterItem";

export const Nav = () => {
  return (
    <div className="nav">
      <h2 className="nav__heading">WHAT BEER?</h2>

      <SearchBar />

      <FilterItem filter="HIGH ABV (&gt; 6%)" />
      <FilterItem filter="Classic range" />
      <FilterItem filter="Acidic (&lt; 4 ph)" />
    </div>
  );
};
