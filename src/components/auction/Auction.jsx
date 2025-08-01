import { useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { formatIndianNumber } from "../../helper/helper";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAllPlayers } from "../../redux/slice/playerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Auction() {
  const [randomPlayer, setRandomPlayer] = useState(null);
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const { players } = useSelector((state) => state.players);

  useEffect(() => {
    dispatch(getAllTeams(auctionId));
    dispatch(getAllPlayers(auctionId));
  }, [auctionId]);

  useEffect(() => {
    if (players && players.length > 0) {
      const i = Math.floor(Math.random() * players.length);
      setRandomPlayer(players[i]);
    }
  }, [players]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : players && players.length === 0 ? (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
          <p className="text-2xl md:text-4xl font-bold">No player found</p>
        </div>
      ) : (
        <div className="min-h-screen w-full space_bg flex flex-col lg:flex-row gap-6 p-4">
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
                <span className="text-green-500">
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

          <div className="w-full lg:w-[55%] text-white flex flex-col justify-between">
            <div className="grid md:grid-cols-2 gap-4">
              {teams && teams.length > 0 ? (
                teams.map((team, i) => (
                  <button
                    key={i}
                    className="py-2 px-4 bg-purple-700 hover:bg-purple-800 rounded text-lg shadow text-center font-medium transition md:text-xl"
                  >
                    {team.team_name}
                  </button>
                ))
              ) : (
                <p className="col-span-full text-center text-lg">
                  No Teams Available.
                </p>
              )}
              <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded shadow transition">
                  Sold
                </button>
                <button className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded shadow transition">
                  Unsold
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auction;
