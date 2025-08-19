import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleAmt } from "../../helper/helper";
import { getAllTeams } from "../../redux/slice/teamSlice";
import {
  getAllPlayers,
  soldPlayer,
  unsoldPlayer,
} from "../../redux/slice/playerSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import PlayerCard from "./component/PlayerCard";
import TeamButton from "./component/TeamButton";
import AuctionActions from "./component/AuctionActions";
import Loader3D from "../common/Loader3D";

function Auction() {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTimer, setShowTimer] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { teams } = useSelector((state) => state.teams);
  const { players } = useSelector((state) => state.players);
  const { selectedAuction } = useSelector((state) => state.auctions);

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
    dispatch(getAllPlayers(auctionId));
    dispatch(getAuctionById(auctionId));

    const timer = setTimeout(() => {
      setShowTimer(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [auctionId]);

  useEffect(() => {
    if (showTimer || transitioning) return;

    const pendingPlayers = players?.filter((p) => p.status === 0) || [];
    if (pendingPlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * pendingPlayers.length);
      const player = pendingPlayers[randomIndex];
      setRandomPlayer(player);
      setCurrentBid(player?.minimum_bid || 0);
      setSelectedTeam(null);
    } else {
      setRandomPlayer(null);
    }
  }, [players, showTimer, transitioning]);

  const handleTeamClick = (team) => {
    if (!selectedAuction || !randomPlayer || transitioning) return;
    const newBid = Number(currentBid) + Number(selectedAuction.bid_increment);

    if (newBid > team.remember_balance) {
      toast.warn("Low balance. Unable to place bid.");
      return;
    }
    if (!selectedTeam) {
      setSelectedTeam(team);
    } else if (selectedTeam?.id !== team?.id) {
      setSelectedTeam(team);
      setCurrentBid(newBid);
    } else {
      setCurrentBid(newBid);
    }
  };

  const handleSold = () => {
    if (!selectedTeam) return toast.error("Please choose a team first!");

    const data = new FormData();
    data.append("_method", "PUT");
    data.append("auction_id", auctionId);
    data.append("player_id", randomPlayer.id);
    data.append("sold_team_id", selectedTeam.id);
    data.append("final_bid", currentBid);

    setTransitioning(true);

    dispatch(soldPlayer(data)).then(() => {
      dispatch(getAllPlayers(auctionId));
      dispatch(getAllTeams(auctionId));

      setTransitioning(true);
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    });

    toast.success(
      `${randomPlayer.player_name} sold to ${
        selectedTeam.team_name
      } for ₹${handleAmt(currentBid)}!`
    );
  };

  const handleUnsold = () => {
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("auction_id", auctionId);
    data.append("player_id", randomPlayer.id);

    setTransitioning(true);

    dispatch(unsoldPlayer(data)).then(() => {
      dispatch(getAllPlayers(auctionId));
      dispatch(getAllTeams(auctionId));

      setTransitioning(true);
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    });

    toast.info(`${randomPlayer.player_name} goes Unsold!`);
  };

  const handleResetBid = () => {
    setCurrentBid(randomPlayer?.minimum_bid || 0);
    setSelectedTeam(null);
  };

  if (showTimer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#030637] via-[#3c0753] to-[#720455]">
        <Loader3D transparent={true} />
      </div>
    );
  }

  if (transitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#030637] via-[#3c0753] to-[#720455]">
        <Loader3D transparent={true} />
      </div>
    );
  }

  return (
    <div>
      {randomPlayer ? (
        <div className="min-h-screen w-full bg-gradient-to-tl from-[#030637] via-[#3c0753] to-[#720455] flex flex-col lg:flex-row gap-6 p-4">
          <PlayerCard player={randomPlayer} />

          <div className="w-full lg:w-[55%] text-white flex flex-col">
            <div className="grid md:grid-cols-2 gap-8">
              {teams.map((team, i) => {
                const isDisabled =
                  Number(team.player_allow) === team.player_buy ||
                  team.state === 1 ||
                  transitioning;

                return (
                  <TeamButton
                    key={i}
                    team={team}
                    selectedTeam={selectedTeam}
                    onClick={() => !isDisabled && handleTeamClick(team)}
                    disabled={isDisabled}
                    index={i}
                  />
                );
              })}
            </div>

            <div className="mt-10 gap-4 text-3xl tracking-wider font-medium text-center bg-black/30 p-4">
              <p>
                Current Bid :{" "}
                <span className="text-green-500">{handleAmt(currentBid)}</span>
              </p>
              <p>Bid by : {selectedTeam ? selectedTeam.team_name : "-"}</p>
            </div>

            <AuctionActions
              onReset={handleResetBid}
              onBack={() => navigate(-1)}
              onSold={handleSold}
              onUnsold={handleUnsold}
              disabled={transitioning}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#200f21] via-[#382039] to-[#5a3d5c] text-white p-4 text-center">
          <p className="text-2xl md:text-4xl font-medium md:block md:w-[70%]">
            Looks like the player list is empty. Please add players to begin the
            auction.
          </p>
        </div>
      )}
    </div>
  );
}

export default Auction;
