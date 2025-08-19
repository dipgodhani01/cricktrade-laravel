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
  auctionDate,
  status,
}) => {
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/add-player/${auctionId}`;
    navigator.clipboard.writeText(link);
    toast.success("Form Link copied!");
  };
  const handleExpiredAction = (str) => {
    let msg = "";
    if (str === "edit") {
      msg =
        "Cannot edit auction after auction date has passed. Please create new auction.";
    } else if (str === "players") {
      msg =
        "Cannot view players after the auction date has passed. If you want to see player details, please check them in the auction summary.";
    } else if (str === "teams") {
      msg =
        "Cannot view teams after the auction date has passed. If you want to see player details, please check them in the auction summary.";
    } else if (str === "dashboard") {
      msg =
        "Cannot open dashboard after auction date have passed. Please create new auction.";
    } else if (str === "reset") {
      msg =
        "Cannot change players status after auction date have passed. Please create new auction.";
    } else if (str === "copy") {
      msg =
        "Cannot copied form link after auction date have passed. Please create new auction.";
    }
    toast.warning(msg);
  };

  // Auction date check
  const isExpired = new Date(auctionDate + "T23:59:59") < new Date();

  return (
    <div className="flex gap-2 text-white">
      <button
        className={actBtn}
        onClick={() =>
          isExpired
            ? handleExpiredAction("edit")
            : navigate(`/edit-auction/${auctionId}`)
        }
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
        onClick={() =>
          isExpired
            ? handleExpiredAction("players")
            : navigate(`/players/${auctionId}`)
        }
        title="All Players"
      >
        <FaUser size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() =>
          isExpired
            ? handleExpiredAction("teams")
            : navigate(`/teams/${auctionId}`)
        }
        title="All Teams"
      >
        <FaUserGroup size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() =>
          isExpired ? handleExpiredAction("dashboard") : confirmOpen(auctionId)
        }
        title="Auction Dashboard"
      >
        <MdDashboard size={16} />
      </button>

      <button
        className={actBtn}
        onClick={() =>
          isExpired ? handleExpiredAction("reset") : unsoldToSold(auctionId)
        }
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
        onClick={() =>
          isExpired ? handleExpiredAction("copy") : handleCopyLink()
        }
        title="Copy & share form link with players"
      >
        <FaCopy size={16} />
      </button>
    </div>
  );
};

export default AuctionActionButtons;
