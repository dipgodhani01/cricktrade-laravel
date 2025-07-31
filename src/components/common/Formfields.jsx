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
    "w-full px-3 py-2 text-sm border bg-white rounded-sm outline-none transition-all";
  const errorStyle = error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-300 focus:border-blue-500";
  const placeholderStyle = "placeholder:text-gray-400";

  const sharedProps = {
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
            className={`${baseInputStyles} ${errorStyle} file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:bg-green-600 file:rounded-sm file:border-0 file:text-sm file:font-semibold  file:text-white hover:file:bg-green-700`}
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
    <div className="mb-1">
      {label && (
        <label
          htmlFor={name}
          className="block font-medium text-gray-700 mb-1 text-start"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {renderField()}
        {extraComponent && (
          <div className="absolute top-2 right-2">{extraComponent}</div>
        )}
        {error && <p className="text-red-600 mt-1 text-start">{error}</p>}
      </div>
    </div>
  );
}

export default Formfields;
