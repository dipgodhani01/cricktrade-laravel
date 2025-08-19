import React from "react";

function CategoryFilter({
  categoryFilter,
  setCategoryFilter,
  options = [],
  placeholder = "All",
}) {
  return (
    <select
      className="p-2 rounded text-sm outline-none cursor-pointer font-sans font-medium text-[#A40000]"
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
