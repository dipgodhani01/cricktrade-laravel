function Formfields({
  type = "text",
  label,
  error,
  value,
  name,
  onChange,
  placeholder,
  options = [],
  extraComponent,
  onKeyPress,
}) {
  const baseInputStyles =
    "w-full px-4 py-2 border rounded shadow outline-none transition duration-200";

  const errorStyle = error
    ? "border-red-500 focus:ring-1 focus:ring-red-400"
    : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300";

  const placeholderStyle = "placeholder-gray-400";

  const sharedProps = {
    id: name,
    name,
    onChange,
    onKeyPress,
    className: `${baseInputStyles} ${errorStyle} ${placeholderStyle}`,
  };

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <select {...sharedProps} value={value}>
            <option value="" disabled>
              Select an option
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <input
            {...sharedProps}
            type="file"
            accept="image/*"
            className={`${baseInputStyles} ${errorStyle} file:mr-4 file:py-1 file:px-4 bg-white
            file:rounded file:border-0 file:text-sm file:font-medium 
            file:bg-[#AA2B1D] file:text-white hover:file:bg-[#A12631]
            file:transition file:duration-200 file:cursor-pointer`}
          />
        );

      default:
        return (
          <input
            {...sharedProps}
            type={type}
            value={value}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 text text-[#8E0505]">
          {label}
        </label>
      )}
      <div className="relative">
        {renderField()}
        {extraComponent && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {extraComponent}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Formfields;
