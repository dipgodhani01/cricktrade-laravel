import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAuction, getUserAuctions } from "../redux/slice/auctionSlice";
import { useEffect, useState } from "react";
import { auctionListTableHeader } from "../data/allMapingData";
import { formatDate, handleAmt } from "../helper/helper";
import { unsoldToSoldPlayerApi } from "../utils/api";
import { toast } from "react-toastify";
import { actBtn, tr } from "../helper/style";
import Thead from "../components/common/Thead";
import DeletePopup from "../components/common/DeletePopup";
import Loader3D from "../components/common/Loader3D";
import { RxCross2 } from "react-icons/rx";
import AuctionActionButtons from "../components/common/AuctionActionButtons";
import AuctionStartPopup from "../components/common/AuctionStartPopup";

function Dashboard() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] = useState("");
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.user_id);
  const { auctions, auctionLoading } = useSelector((state) => state.auctions);
  console.log(selectedImage);

  function confirmDelete(auctionId) {
    setSelectedAuctionId(auctionId);
    setShowConfirmModal(true);
  }
  function confirmOpen(auctionId) {
    setSelectedAuctionId(auctionId);
    setOpenConfirmModal(true);
  }

  function handleDeleteAuctionConfirmed() {
    if (selectedAuctionId) {
      dispatch(deleteAuction({ auctionId: selectedAuctionId }));
      setShowConfirmModal(false);
      setSelectedAuctionId("");
    }
  }
  function handleOpenAuctionConfirmed() {
    if (selectedAuctionId) {
      navigate(`/auction/${selectedAuctionId}`);
      setOpenConfirmModal(false);
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
    <>
      <div className="p-4 bg-[#FAF4E1] text-[#A40000] min-h-[calc(100vh-65px)]">
        <h2 className="text-2xl font-medium text-center">My Auction List</h2>
        <button
          className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
          onClick={() => navigate("/create-auction")}
        >
          + Add Auction
        </button>
        <br />
        {auctionLoading ? (
          <Loader3D />
        ) : (
          <div className="mt-4 overflow-x-auto table-responsive">
            {auctions && auctions.length > 0 ? (
              <table className="border-collapse w-full mb-3 min-w-[1280px] shadow-md">
                <Thead data={auctionListTableHeader} />
                <tbody className="bg-[#FFFEEC]">
                  {auctions.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-[#3f230575] px-4 py-2">
                          <AuctionActionButtons
                            auctionId={data.id}
                            auctionLogo={data.auction_logo}
                            actBtn={actBtn}
                            confirmDelete={confirmDelete}
                            confirmOpen={confirmOpen}
                            unsoldToSold={unsoldToSold}
                            setSelectedImage={setSelectedImage}
                            setImagePopupOpen={setImagePopupOpen}
                          />
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

      {openConfirmModal && (
        <AuctionStartPopup
          handleOpenConfirmed={handleOpenAuctionConfirmed}
          setOpenConfirmModal={setOpenConfirmModal}
        />
      )}

      {imagePopupOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setImagePopupOpen(false)}
        >
          <div className="w-[90%] max-w-xl bg-transparent rounded-lg shadow-lg overflow-hidden p-4">
            <button
              onClick={() => setImagePopupOpen(false)}
              className="text-white bg-[#AA2B1D] hover:bg-red-700 w-10 h-10 rounded-full flex items-center justify-center text-xl p-2 ml-auto mb-2"
            >
              <RxCross2 />
            </button>
            <img
              src={selectedImage}
              alt="Auction Logo"
              className="w-full h-auto object-contain rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
