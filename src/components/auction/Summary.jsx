import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import {
  summaryPlayerTableHeader,
  summaryTeamTableHeader,
} from "../../data/allMapingData";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { filterPlayers, filterTeams, handleAmt } from "../../helper/helper";
import { notFound, tr } from "../../helper/style";
import Thead from "../common/Thead";
import { getPlayersByTeam } from "../../redux/slice/playerSlice";
import Chakra from "../common/Chakra";
import SearchFilter from "../common/SearchFilter";
import SummaryHead from "./component/SummaryHead";
import TeamTable from "./component/TeamTable";
import PlayerTable from "./component/PlayerTable";

function Summary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, teamLoading } = useSelector((state) => state.teams);
  const { playersByTeam, playerLoading } = useSelector(
    (state) => state.players
  );
  const { selectedAuction, auctionLoading } = useSelector(
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

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId, dispatch]);

  return (
    <div className="bg-[#FAF4E1] min-h-screen pt-6">
      <div className="container mx-auto w-full px-4">
        {/* Auction Details */}
        {auctionLoading ? (
          <Chakra center={true} />
        ) : (
          <SummaryHead
            logo={selectedAuction?.auction_logo}
            name={selectedAuction?.auction_name}
            totalTeams={totalTeams}
          />
        )}

        {/* Team Summary Table */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <h2 className="text-center my-4 text-2xl font-medium text-[#A40000]">
              All Teams & Details
            </h2>
            {teams?.length > 0 && !playerLoading && (
              <SearchFilter
                placeholder="Search Team..."
                value={searchTerm}
                handleChange={(e) => setSearchTerm(e.target.value)}
              />
            )}

            {teamLoading ? (
              <Chakra center={true} />
            ) : filteredTeams?.length > 0 ? (
              <TeamTable filteredTeams={filteredTeams} />
            ) : !teamLoading ? (
              <div className={notFound}>No teams available.</div>
            ) : null}
          </div>
        </div>

        {/* Player Summary Table */}
        <div>
          <div className="overflow-x-auto">
            <h2 className="text-center my-4 text-2xl font-medium text-[#A40000]">
              Players in the selected team
            </h2>

            {playersByTeam?.length > 0 && !playerLoading && (
              <SearchFilter
                placeholder="Search Player..."
                value={playerSearchTerm}
                handleChange={(e) => setPlayerSearchTerm(e.target.value)}
              />
            )}
            {playerLoading ? (
              <Chakra center={true} />
            ) : filteredPlayers?.length > 0 ? (
              <PlayerTable filteredPlayers={filteredPlayers} />
            ) : !playerLoading ? (
              <div className={notFound}>Players not found!</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
