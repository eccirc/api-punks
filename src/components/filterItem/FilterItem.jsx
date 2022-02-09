import React from "react";
import "./FilterItem.scss";

export const FilterItem = (props) => {
  const { filter } = props;
  return (
    <div className="filter">
      <label htmlFor="">{filter}</label>
      <input
        className="filter__check"
        type="checkbox"
        name="filter"
        id="filter"
      />
    </div>
  );
};
