const Formfields = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder = "",
  required = false,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="" className="text-gray-500">
              Select {label}
            </option>
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <>
            <input
              type="file"
              name={name}
              onChange={onChange}
              required={required}
              className="w-full text-sm text-gray-700 border file:cursor-pointer file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-100"
            />
          </>
        );

      default:
        return (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              required={required}
              placeholder={placeholder}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </>
        );
    }
  };

  return (
    <div>
      {label && (
        <label
          className={`block mb-1 font-medium text-gray-700 ${
            type == "file" && "cursor-pointer"
          }`}
        >
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default Formfields;
