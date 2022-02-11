import React from "react";
import "./SearchBar.scss";

export const SearchBar = (props) => {
  const { handleInput } = props;
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        name="search"
        id="search"
        placeholder="search for beers!"
        onInput={handleInput}
      />
    </div>
  );
};
