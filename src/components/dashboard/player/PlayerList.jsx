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
import Thead from "../../common/Thead";
import { actBtn, tr, trUpper } from "../../../helper/style";
import DeletePopup from "../../common/DeletePopup";
import ReactPaginate from "react-paginate";
import { LuListFilter } from "react-icons/lu";

function PlayerList() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [minBid, setMinBid] = useState(false);
  const [error, setError] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { players, playerLoading } = useSelector((state) => state.players);
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playersPerPage = 10;
  const offset = currentPage * playersPerPage;
  const filteredPlayers = players.filter((player) =>
    player.player_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPlayers = filteredPlayers.slice(offset, offset + playersPerPage);
  const pageCount = Math.ceil(filteredPlayers.length / playersPerPage);

  function confirmDelete(playerId) {
    setSelectedPlayerId(playerId);
    setShowConfirmModal(true);
  }
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
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

        <div className="py-4">
          <div className="flex items-center gap-3 border-b border-b-gray-300 px-3 py-2 hover:border-blue-500 transition">
            <LuListFilter
              className="text-gray-500 group-hover:text-blue-500"
              size={20}
            />
            <input
              type="search"
              placeholder="Search Player..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
            />
          </div>
        </div>

        {playerLoading ? (
          <Loader2 />
        ) : (
          <div className="mt-4 overflow-y-auto table-responsive">
            {currentPlayers && currentPlayers.length > 0 ? (
              <table className="border-collapse border w-full mb-3 min-w-[1180px] border-black">
                <Thead data={playerListTableHeader} />
                <tbody>
                  {currentPlayers.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className={actBtn}
                              title="Edit Player"
                              onClick={() =>
                                navigate(`/edit-player/${data.id}`)
                              }
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className={actBtn}
                              title="Delete Player"
                              onClick={() => confirmDelete(data.id)}
                            >
                              <MdDelete size={20} />
                            </button>
                            <button
                              className={actBtn}
                              title="Change player minimum bid"
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
                        <td className={tr}>{data.player_name}</td>
                        <td className={tr}>{data.minimum_bid}</td>
                        <td className={tr}>{data.category}</td>
                        <td className={tr}>{data.phone}</td>
                        <td className={trUpper}>{data.tshirt_size}</td>
                        <td className={trUpper}>{data.trouser_size || "-"}</td>
                        <td className={tr}>{data.tshirt_name}</td>
                        <td className={tr}>{data.tshirt_number}</td>
                        <td
                          className={`${tr} capitalize font-medium ${
                            data.status === "sold"
                              ? "text-green-600"
                              : data.status === "unsold"
                              ? "text-red-600"
                              : data.status === "pending"
                              ? "text-orange-600"
                              : ""
                          }`}
                        >
                          {data.status}
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
        {players.length > playersPerPage && (
          <div className="flex justify-start mt-6">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< Prev"
              renderOnZeroPageCount={null}
              containerClassName="flex gap-2 text-sm"
              pageClassName="px-3 py-1 border rounded"
              activeClassName="bg-blue-600 text-white"
              previousClassName="px-3 py-1 border rounded"
              nextClassName="px-3 py-1 border rounded"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>

      {showConfirmModal && !showUpdateModal && (
        <DeletePopup
          title="Are you sure you want to delete this player?"
          handleDeleteConfirmed={handleDeletePlayerConfirmed}
          setShowConfirmModal={setShowConfirmModal}
        />
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
