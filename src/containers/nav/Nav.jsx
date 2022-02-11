import React from "react";
import "./Nav.scss";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { FilterItem } from "../../components/filterItem/FilterItem";

export const Nav = (props) => {
  const { handleSearch, handleCheckBox, checkBoxState, toggleStyle } = props;
  return (
    <div className={`nav ${toggleStyle ? "" : "slide-left"}`}>
      <h2 className="nav__heading">WHAT BEER?</h2>

      <SearchBar handleInput={handleSearch} />
      <div className="nav__filters">
        <FilterItem
          title="HIGH ABV (&gt; 6%)"
          isChecked={checkBoxState[0]}
          handleChecked={() => handleCheckBox(0)}
        />
        <FilterItem
          title="Classic range"
          isChecked={checkBoxState[1]}
          handleChecked={() => handleCheckBox(1)}
        />
        <FilterItem
          title="Acidic (&lt; 4 ph)"
          isChecked={checkBoxState[2]}
          handleChecked={() => handleCheckBox(2)}
        />
      </div>
    </div>
  );
};
