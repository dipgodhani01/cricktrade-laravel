import { useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { formatIndianNumber } from "../../helper/helper";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAllPlayers, soldPlayer } from "../../redux/slice/playerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import { toast } from "react-toastify";

function Auction() {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const { players } = useSelector((state) => state.players);
  const { selectedAuction } = useSelector((state) => state.auctions);

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
    dispatch(getAllPlayers(auctionId));
    dispatch(getAuctionById(auctionId));
  }, [auctionId]);

  useEffect(() => {
    if (players && players.length > 0) {
      const pendingPlayers = players.filter((p) => p.status === "pending");
      if (pendingPlayers.length > 0) {
        const i = Math.floor(Math.random() * pendingPlayers.length);
        setRandomPlayer(pendingPlayers[i]);
        setCurrentBid(pendingPlayers[i]?.minimum_bid || 0);
        setSelectedTeam(null);
      } else {
        setRandomPlayer(null);
      }
    }
  }, [players]);

  const getNextPlayer = () => {
    if (players && players.length > 0) {
      let nextIndex;
      nextIndex = Math.floor(Math.random() * players.length);
      setRandomPlayer(players[nextIndex]);
      setCurrentBid(players[nextIndex]?.minimum_bid || 0);
      setSelectedTeam(null);
    }
  };

  const handleTeamClick = (team) => {
    if (!selectedAuction || !randomPlayer) return;

    const newBid = Number(currentBid) + Number(selectedAuction.bid_increment);
    setCurrentBid(newBid);
    setSelectedTeam(team);
  };

  const handleSold = () => {
    if (!selectedTeam) {
      toast.error("Please choose a team first!");
      return;
    }
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("auction_id", auctionId);
    data.append("player_id", randomPlayer.id);
    data.append("sold_team_id", selectedTeam.id);
    data.append("final_bid", currentBid);

    dispatch(soldPlayer(data));
    toast.success(
      `Player sold to ${selectedTeam.team_name} for ${formatIndianNumber(
        currentBid
      )}!`
    );
  };

  const handleResetBid = () => {
    if (randomPlayer) {
      setCurrentBid(randomPlayer.minimum_bid || 0);
      setSelectedTeam(null);
    }
  };

  if (!randomPlayer) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
        <p className="text-2xl md:text-4xl font-bold">No player found</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen w-full bg-black flex flex-col lg:flex-row gap-6 p-4">
          <div className="w-full lg:w-[50%] text-white flex flex-col gap-4">
            <div className="w-full h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-lg">
              <img
                src={randomPlayer?.player_logo}
                alt="Player"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="p-4 bg-black">
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                Base Price:{" "}
                <span className="text-orange-500">
                  {formatIndianNumber(randomPlayer?.minimum_bid) || "0"}
                </span>
              </p>
            </div>

            <div className="p-4 bg-black rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl font-medium mb-4 text-center">
                Player Details
              </h2>
              <div className="space-y-2">
                <p className="text-lg md:text-xl">
                  Name: {randomPlayer?.player_name || "N/A"}
                </p>
                <p className="text-lg md:text-xl">
                  Sports Category: {randomPlayer?.category || "N/A"}
                </p>
                <p className="text-lg md:text-xl">
                  Contact: +91 {randomPlayer?.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[55%] text-white flex flex-col">
            <div className="grid md:grid-cols-2 gap-4">
              {teams && teams.length > 0 ? (
                teams.map((team, i) => (
                  <button
                    key={i}
                    onClick={() => handleTeamClick(team)}
                    className={`py-2 px-4 rounded text-lg shadow text-center font-medium transition md:text-xl ${
                      selectedTeam?._id === team._id
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-purple-700 hover:bg-purple-800"
                    }`}
                  >
                    {team.team_name}
                  </button>
                ))
              ) : (
                <p className="col-span-full text-center text-lg">
                  No Teams Available.
                </p>
              )}
            </div>
            <div className="mt-10 gap-4 text-2xl font-medium text-center">
              <p>
                Current Bid:{" "}
                <span className="text-green-500">
                  {formatIndianNumber(currentBid)}
                </span>
              </p>
              {selectedTeam && <p>Bid by: {selectedTeam.team_name}</p>}
            </div>
            <br />
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="py-2 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition">
                Skip
              </button>
              <button
                onClick={handleResetBid}
                className="py-2 px-8 bg-gray-600 hover:bg-gray-700 text-white rounded shadow transition"
              >
                Reset Bid
              </button>
              <button className="py-2 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded shadow transition">
                Back
              </button>
              <button
                onClick={handleSold}
                className={`py-2 px-8 text-white bg-green-600 hover:bg-green-700 rounded shadow transition`}
              >
                Sold
              </button>
              <button className="py-2 px-8 bg-red-600 hover:bg-red-700 text-white rounded shadow transition">
                Unsold
              </button>
              <button
                className="py-2 px-8 bg-purple-600 hover:bg-purple-700 text-white rounded shadow transition"
                onClick={getNextPlayer}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auction;
