function StatusFilter({
  statusFilter,
  setStatusFilter,
  setCurrentPage,
  options = [],
  placeholder = "All",
}) {
  return (
    <select
      className="p-2 rounded text-sm outline-none cursor-pointer font-sans font-medium text-[#A40000]"
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value);
        if (setCurrentPage) setCurrentPage(0);
      }}
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

export default StatusFilter;
