import React from "react";
import "./FilterItem.scss";

export const FilterItem = (props) => {
  const { title, isChecked, handleChecked, handleSlide } = props;
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
      <input type="range" min="1" max="60" value="6" onChange={handleSlide} />
    </div>
  );
};
