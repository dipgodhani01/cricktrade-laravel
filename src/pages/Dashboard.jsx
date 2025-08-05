import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAuction, getUserAuctions } from "../redux/slice/auctionSlice";
import { useEffect, useState } from "react";
import { auctionListTableHeader } from "../data/allMapingData";
import { formatDate, handleAmt } from "../helper/helper";
import { MdDashboard, MdDelete, MdEdit, MdSummarize } from "react-icons/md";
import { FaUser, FaUserGroup } from "react-icons/fa6";
import Loader2 from "../components/common/Loader2";
import { GrPowerReset } from "react-icons/gr";
import { unsoldToSoldPlayerApi } from "../utils/api";
import { toast } from "react-toastify";
import { actBtn, tr, trImg } from "../helper/style";
import Thead from "../components/common/Thead";
import DeletePopup from "../components/common/DeletePopup";

function Dashboard() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.user_id);
  const { auctions, auctionLoading } = useSelector((state) => state.auctions);

  function confirmDelete(auctionId) {
    setSelectedAuctionId(auctionId);
    setShowConfirmModal(true);
  }

  function handleDeleteAuctionConfirmed() {
    if (selectedAuctionId) {
      dispatch(deleteAuction({ auctionId: selectedAuctionId }));
      setShowConfirmModal(false);
      setSelectedAuctionId("");
    }
  }

  async function unsoldToSold(auctionId) {
    const auction_id = auctionId;

    try {
      const res = await unsoldToSoldPlayerApi(auction_id);
      if (res.data.success === true) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.info(error.response.data.message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  }

  useEffect(() => {
    dispatch(getUserAuctions(userId));
  }, []);

  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-medium text-center">My Auction List</h2>
        <button
          className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
          onClick={() => navigate("/create-auction")}
        >
          + Add Auction
        </button>
        <br />
        {auctionLoading ? (
          <Loader2 />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {auctions && auctions.length > 0 ? (
              <table className="border-collapse w-full border mb-3 min-w-[1120px] border-black">
                <Thead data={auctionListTableHeader} />
                <tbody>
                  {auctions.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className={actBtn}
                              onClick={() =>
                                navigate(`/edit-auction/${data.id}`)
                              }
                              title="Edit Auction"
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => confirmDelete(data.id)}
                              title="Delete Auction"
                            >
                              <MdDelete size={20} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => navigate(`/players/${data.id}`)}
                              title="All Players"
                            >
                              <FaUser size={16} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => navigate(`/teams/${data.id}`)}
                              title="All Teams"
                            >
                              <FaUserGroup size={16} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => navigate(`/auction/${data.id}`)}
                              title="Auction Dashboard"
                            >
                              <MdDashboard size={16} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() => unsoldToSold(data.id)}
                              title="Mark all unsold player are available for auction"
                            >
                              <GrPowerReset size={16} />
                            </button>
                            <button
                              className={actBtn}
                              onClick={() =>
                                navigate(`/auction/summary/${data.id}`)
                              }
                              title="Auction summary"
                            >
                              <MdSummarize size={16} />
                            </button>
                          </div>
                        </td>
                        <td className={tr}>
                          <img src={data?.auction_logo} className={trImg} />
                        </td>
                        <td className={tr}>{data.auction_name}</td>
                        <td className={tr}>{data.sports_type}</td>
                        <td className={tr}>{handleAmt(data.point_perteam)}</td>
                        <td className={tr}>{handleAmt(data.minimum_bid)}</td>
                        <td className={tr}>{handleAmt(data.bid_increment)}</td>
                        <td className={tr}>{data.player_perteam}</td>
                        <td className={tr}>{formatDate(data?.auction_date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Auction Available
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirmModal && (
        <DeletePopup
          title="Are you sure you want to delete this auction?"
          handleDeleteConfirmed={handleDeleteAuctionConfirmed}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
