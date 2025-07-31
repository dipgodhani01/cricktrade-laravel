import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerListTableHeader } from "../../../data/allMapingData";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../common/Loader2";
import { MdCurrencyRupee, MdDelete, MdEdit } from "react-icons/md";
import {
  deletePlayer,
  getAllPlayers,
  updateMinimumBid,
} from "../../../redux/slice/playerSlice";
import Formfields from "../../common/Formfields";
import { EnglishConstant } from "../../../messages/message";
import { toast } from "react-toastify";

function PlayerList() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [minBid, setMinBid] = useState(false);
  const [error, setError] = useState({});
  const { players, loading } = useSelector((state) => state.players);
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function confirmDelete(playerId) {
    setSelectedPlayerId(playerId);
    setShowConfirmModal(true);
  }

  function handleDeletePlayerConfirmed() {
    if (selectedPlayerId) {
      dispatch(deletePlayer({ playerId: selectedPlayerId }));
      setShowConfirmModal(false);
      setSelectedPlayerId("");
    }
  }
  function onChangeField(name, value) {
    if (name === "minimumBid") {
      setMinBid(value);
      setError({});
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (minBid === "") {
      setError({ minimumBid: EnglishConstant.minimumBid });
      return;
    }
    const data = new FormData();
    data.append("player_id", selectedPlayerId);
    data.append("_method", "PUT");
    data.append("minimum_bid", minBid);

    try {
      setShowUpdateModal(false);
      await dispatch(updateMinimumBid(data)).unwrap();
      toast.success("Minimum bid updated successfully!");
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    dispatch(getAllPlayers(auctionId));
  }, [auctionId]);

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
              <table className="border-collapse w-full border mb-3 min-w-[1180px] border-black">
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
                              title="Edit Player"
                              onClick={() =>
                                navigate(`/edit-player/${data.id}`)
                              }
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              title="Delete Player"
                              onClick={() => confirmDelete(data.id)}
                            >
                              <MdDelete size={20} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              title="Edit Auction"
                              onClick={() => {
                                setSelectedPlayerId(data.id);
                                setMinBid(data.minimum_bid);
                                setShowUpdateModal(true);
                              }}
                            >
                              <MdCurrencyRupee size={20} />
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
                          {data.phone}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 uppercase">
                          {data.tshirt_size}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 uppercase">
                          {data.trouser_size || "-"}
                        </td>
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

      {showConfirmModal && !showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
            <h3 className="text-2xl font-medium mb-4">
              Are you sure you want to delete this player?
            </h3>
            <div className="flex justify-end gap-4 pt-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 min-w-20 rounded"
                onClick={handleDeletePlayerConfirmed}
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
      )}

      {showUpdateModal && !showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
            <h3 className="text-2xl font-medium mb-4">
              Change Player's Minimum Bid Price
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <Formfields
                  type="text"
                  label="Minimum Bid"
                  placeholder="Enter minimum bid price"
                  name="minimumBid"
                  value={minBid}
                  onChange={(e) => onChangeField("minimumBid", e.target.value)}
                  error={error.minimumBid}
                />
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 min-w-20 rounded"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 min-w-20 rounded"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerList;
