import React from "react";

function SubmitButton({ title, green }) {
  return (
    <>
      {!green ? (
        <div className="mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {title}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {title}
          </button>
        </div>
      )}
    </>
  );
}

export default SubmitButton;
