import React from "react";
import "./FilterItem.scss";

export const FilterItem = (props) => {
  const { title, isChecked, handleChecked } = props;
  return (
    <div className="filter">
      <label htmlFor="">{title}</label>
      <input
        className="filter__check"
        type="checkbox"
        name="filter"
        id="filter"
        checked={isChecked}
        onChange={handleChecked}
      />
    </div>
  );
};
