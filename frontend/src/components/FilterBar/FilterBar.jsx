import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ initialFilters, onApply }) => {
  const [localFilters, setLocalFilters] =
    useState(initialFilters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  return (
    <div className='filter-bar'>
      <div className='filter-group'>
        <label htmlFor='store'>Store:</label>
        <select
          id='store'
          name='store'
          className='filter-select'
          value={localFilters.store}
          onChange={handleChange}
        >
          <option value='all'>All Stores</option>
          <option value='1'>Store 1</option>
          <option value='2'>Store 2</option>
        </select>
      </div>

      <div className='filter-group'>
        <label>Date Range:</label>
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            type='date'
            name='startDate'
            className='filter-input'
            value={localFilters.startDate}
            onChange={handleChange}
          />
          <span style={{ color: "#a0aec0" }}>to</span>
          <input
            type='date'
            name='endDate'
            className='filter-input'
            value={localFilters.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className='apply-btn'
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
