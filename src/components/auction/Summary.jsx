import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import Loader2 from "../common/Loader2";
import {
  summaryPlayerTableHeader,
  summaryTableHeader,
} from "../../data/allMapingData";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { filterPlayers, filterTeams, handleAmt } from "../../helper/helper";
import { tr } from "../../helper/style";
import Thead from "../common/Thead";
import { LuListFilter } from "react-icons/lu";
import { getPlayersByTeam } from "../../redux/slice/playerSlice";

function Summary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);
  const { playersByTeam, playerLoading } = useSelector(
    (state) => state.players
  );
  const { selectedAuction, loading: auctionLoading } = useSelector(
    (state) => state.auctions
  );
  const filteredTeams = useMemo(
    () => filterTeams(teams, searchTerm),
    [teams, searchTerm]
  );
  const filteredPlayers = useMemo(
    () => filterPlayers(playersByTeam, playerSearchTerm),
    [playersByTeam, playerSearchTerm]
  );

  const totalTeams = useMemo(() => teams?.length || 0, [teams]);
  const isLoading = teamsLoading || auctionLoading;

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId, dispatch]);

  if (!selectedAuction && !isLoading) {
    return <div className="text-center py-10 text-xl">Data Not Available</div>;
  }

  return (
    <div className="container mx-auto w-full px-4">
      {/* Auction Details */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 />
        </div>
      ) : (
        <div className="gap-6 bg-white shadow-md rounded-2xl p-6 mb-6">
          <div className="text-center text-lg md:text-2xl lg:text-2xl font-medium flex flex-col justify-center gap-2">
            <img
              src={selectedAuction?.auction_logo}
              alt="Auction Logo"
              className="h-[100px] md:h-[140px] w-auto object-contain rounded-xl"
              loading="lazy"
            />
            <div>
              <p>{selectedAuction?.auction_name}</p>
              <p className="text-base md:text-lg text-gray-500">
                A total of {totalTeams} teams have participated in this auction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Team Summary Table */}
      <div className="mb-8">
        <div className="overflow-x-auto">
          <h2 className="text-center my-4 text-2xl font-medium">
            All Teams & Details
          </h2>

          <div className="py-4">
            <div className="flex items-center gap-3 border-b border-b-gray-300 px-3 py-2 hover:border-blue-500 transition">
              <LuListFilter
                className="text-gray-500 group-hover:text-blue-500"
                size={20}
              />
              <input
                type="search"
                placeholder="Search Team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
          </div>
          {filteredTeams?.length > 0 ? (
            <table className="w-full min-w-[1200px] border-collapse">
              <Thead data={summaryTableHeader} />
              <tbody>
                {filteredTeams.map((team, i) => (
                  <tr
                    key={team.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => dispatch(getPlayersByTeam(team.id))}
                  >
                    <td className={tr}>{i + 1}</td>
                    <td className={tr}>
                      <img
                        src={team.team_logo}
                        alt={`${team.team_name} logo`}
                        className="w-16 h-14 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className={tr}>{team.team_name}</td>
                    <td className={tr}>{team.player_buy}</td>
                    <td className={tr}>{team.player_remember}</td>
                    <td className={tr}>{handleAmt(team.team_balance)}</td>
                    <td className={tr}>{handleAmt(team.remember_balance)}</td>
                    <td className={tr}>{handleAmt(team.reserve_balance)}</td>
                    <td className={tr}>
                      {handleAmt(team.remember_balance - team.reserve_balance)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-blue-500 hover:text-blue-700">
                      <button className="flex items-center justify-center w-full h-full">
                        <FaCloudDownloadAlt size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !isLoading && (
              <div className="p-8 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Teams Available
              </div>
            )
          )}
        </div>
      </div>

      {/* Player Summary Table */}
      <div className="mb-8">
        <div className="overflow-x-auto">
          <h2 className="text-center my-4 text-2xl font-medium">
            Players in the selected team
          </h2>

          {playersByTeam?.length > 0 && !playerLoading && (
            <div className="py-4">
              <div className="flex items-center gap-3 border-b border-b-gray-300 px-3 py-2 hover:border-blue-500 transition">
                <LuListFilter
                  className="text-gray-500 group-hover:text-blue-500"
                  size={20}
                />
                <input
                  type="search"
                  placeholder="Search Player..."
                  value={playerSearchTerm}
                  onChange={(e) => setPlayerSearchTerm(e.target.value)}
                  className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
                />
              </div>
            </div>
          )}
          {filteredPlayers?.length > 0 ? (
            playerLoading ? (
              <Loader2 />
            ) : (
              <table className="w-full min-w-[1200px] border-collapse">
                <Thead data={summaryPlayerTableHeader} />
                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr
                      key={player.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className={tr}>{player.index}</td>
                      <td className={tr}>
                        <img
                          src={player.player_logo}
                          className="w-16 h-14 object-cover rounded mx-auto"
                        />
                      </td>
                      <td className={tr}>{player.player_name}</td>
                      <td className={tr}>{player.category}</td>
                      <td className={tr}>{player.status}</td>
                      <td className={tr}>{player.sold_team}</td>
                      <td className={tr}>{handleAmt(player.final_bid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            !playerLoading && (
              <div className="p-8 text-center text-red-600 text-xl md:text-2xl font-medium">
                No players available for the selected team.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
