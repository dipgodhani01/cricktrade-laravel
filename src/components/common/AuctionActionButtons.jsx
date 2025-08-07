import { MdEdit, MdDelete, MdDashboard, MdSummarize } from "react-icons/md";
import { FaUser, FaUserGroup, FaImage, FaCopy } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuctionActionButtons = ({
  auctionId,
  actBtn,
  auctionLogo,
  confirmDelete,
  confirmOpen,
  unsoldToSold,
  setSelectedImage,
  setImagePopupOpen,
}) => {
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/add-player/${auctionId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied!");
  };

  return (
    <div className="flex gap-2 text-white">
      <button
        className={actBtn}
        onClick={() => navigate(`/edit-auction/${auctionId}`)}
        title="Edit Auction"
      >
        <MdEdit size={18} />
      </button>

      <button
        className={actBtn}
        onClick={() => confirmDelete(auctionId)}
        title="Delete Auction"
      >
        <MdDelete size={18} />
      </button>

      <button
        className={actBtn}
        onClick={() => navigate(`/players/${auctionId}`)}
        title="All Players"
      >
        <FaUser size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() => navigate(`/teams/${auctionId}`)}
        title="All Teams"
      >
        <FaUserGroup size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() => confirmOpen(auctionId)}
        title="Auction Dashboard"
      >
        <MdDashboard size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() => unsoldToSold(auctionId)}
        title="Mark all unsold players as available"
      >
        <GrPowerReset size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() => navigate(`/auction/summary/${auctionId}`)}
        title="Auction Summary"
      >
        <MdSummarize size={16} />
      </button>

      <button
        className={actBtn}
        title="View Auction Logo"
        onClick={() => {
          setSelectedImage(auctionLogo);
          setImagePopupOpen(true);
        }}
      >
        <FaImage size={16} />
      </button>

      <button
        className={actBtn}
        onClick={handleCopyLink}
        title="Copy & share form link with players"
      >
        <FaCopy size={16} />
      </button>
    </div>
  );
};

export default AuctionActionButtons;
