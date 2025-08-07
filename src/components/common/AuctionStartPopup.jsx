import thinkGif from "../../assets/think.webp";

function AuctionStartPopup({ handleOpenConfirmed, setOpenConfirmModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-[#F2E8C6] rounded-lg shadow-md
              max-w-sm relative min-h-[280px] flex flex-col justify-between"
      >
        <div className="relative h-[280px] w-full">
          <img
            src={thinkGif}
            alt="Auction Icon"
            className="h-full w-full rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-md p-4"></div>
        </div>

        <div className=" gap-4 p-4 font-sans font-medium tracking-wide">
          <h3 className="text-[#8E0505] text-2xl font-medium text-center px-2 mb-4">
            Are you sure you want to start the auction?
          </h3>
          <div className="flex gap-4 justify-end">
            <button
              className="bg-gradient-to-r from-green-600 via-green-600 to-green-700 text-white px-4 py-2 min-w-20 rounded"
              onClick={handleOpenConfirmed}
            >
              Yes, of course
            </button>
            <button
              className="bg-gradient-to-r from-red-500 via-red-700 to-red-700 text-white px-4 py-2 min-w-20 rounded"
              onClick={() => setOpenConfirmModal(false)}
            >
              Not yet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionStartPopup;
