import React from "react";

function AuctionActions({ onReset, onBack, onSold, onUnsold }) {
  return (
    <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
      <button
        onClick={onReset}
        className="py-2 px-8 bg-gray-600 hover:bg-gray-700 text-white rounded shadow transition"
      >
        Reset Bid
      </button>
      <button
        onClick={onBack}
        className="py-2 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded shadow transition"
      >
        Back
      </button>
      <button
        onClick={onSold}
        className="py-2 px-8 text-white bg-green-600 hover:bg-green-700 rounded shadow transition"
      >
        Sold
      </button>
      <button
        onClick={onUnsold}
        className="py-2 px-8 bg-red-600 hover:bg-red-700 text-white rounded shadow transition"
      >
        Unsold
      </button>
    </div>
  );
}

export default AuctionActions;
