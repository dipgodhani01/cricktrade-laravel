import React from "react";
import { searchContainer, searchField } from "../../helper/style";
import { LuListFilter } from "react-icons/lu";

function SearchFilter({ handleChange, value, placeholder }) {
  return (
    <div className="py-4">
      <div className={searchContainer}>
        <LuListFilter className="text-[#AA2B1D]" size={20} />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={searchField}
        />
      </div>
    </div>
  );
}

export default SearchFilter;
