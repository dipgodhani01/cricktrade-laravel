import React from "react";
import { useSelector } from "react-redux";
import { playerListTableHeader } from "../../../data/allMapingData";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../common/Loader2";
import { MdEdit } from "react-icons/md";

function PlayerList() {
  const { players, loading } = useSelector((state) => state.players);
  const showTrouserSize = players?.some((player) => player.trouser_size);
  const { auctionId } = useParams();
  const navigate = useNavigate();

  if (showTrouserSize) {
    playerListTableHeader.push("Trouser Size");
  }

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-medium text-center mb-4">
          All Player List
        </h2>
        <button
          className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
          onClick={() => navigate(`/create-player/${auctionId}`)}
        >
          + Add Player
        </button>
        <br />
        {loading ? (
          <Loader2 />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {players && players.length > 0 ? (
              <table className="border-collapse w-full border mb-3 min-w-[1120px] border-black">
                <thead className="bg-gray-100">
                  <tr>
                    {playerListTableHeader?.map((li, i) => {
                      return (
                        <th
                          key={i}
                          className="border border-gray-200 px-4 py-2 text-left"
                        >
                          {li}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {players.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              title="Edit Auction"
                            >
                              <MdEdit size={20} />
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.player_name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.minimum_bid}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.category}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          +91 {formatIndianNumber(data.phone)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.tshirt_size}
                        </td>
                        {showTrouserSize && (
                          <td className="border border-gray-200 px-4 py-2">
                            {data.trouser_size || "-"}
                          </td>
                        )}
                        <td className="border border-gray-200 px-4 py-2">
                          {data.tshirt_name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.tshirt_number}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Players Available
              </div>
            )}
          </div>
        )}
      </div>

      {/* {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
            <h3 className="text-2xl font-medium mb-4">
              Are you sure you want to delete this player?
            </h3>
            <div className="flex justify-end gap-4 pt-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 min-w-20 rounded"
                onClick={handleDeleteAuctionConfirmed}
              >
                Yes
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 min-w-20 rounded"
                onClick={() => setShowConfirmModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default PlayerList;
