import React from "react";
import "./SearchBar.scss";

export const SearchBar = () => {
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="search for beers!"
      />
    </div>
  );
};
