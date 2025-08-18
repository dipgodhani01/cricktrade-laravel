import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPlayers, filterTeams } from "../../helper/helper";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import { getAllTeams } from "../../redux/slice/teamSlice";
import PlayerTable from "../auction/component/PlayerTable";
import SearchFilter from "../common/SearchFilter";
import TeamTable from "../auction/component/TeamTable";
import Chakra from "../common/Chakra";
import { notFound } from "../../helper/style";

function AuctionSummary({ auctionId }) {
  const [teamSearchTerm, setTeamSearchTerm] = useState("");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { teams, teamLoading } = useSelector((state) => state.teams);
  const { playersByTeam, playerLoading } = useSelector(
    (state) => state.players
  );

  const filteredTeams = useMemo(
    () => filterTeams(teams, teamSearchTerm),
    [teams, teamSearchTerm]
  );
  const filteredPlayers = useMemo(
    () => filterPlayers(playersByTeam, playerSearchTerm),
    [playersByTeam, playerSearchTerm]
  );

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId, dispatch]);

  return (
    <div className="container mx-auto w-full px-4">
      <div className="mb-8">
        <h2 className="text-center my-4 text-2xl font-medium text-[#A40000]">
          All Teams & Details
        </h2>
        <div className="overflow-x-auto">
          {teams?.length > 0 && !playerLoading && (
            <SearchFilter
              placeholder="Search Team..."
              value={teamSearchTerm}
              handleChange={(e) => setTeamSearchTerm(e.target.value)}
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

      <div className="pb-6">
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
  );
}

export default AuctionSummary;
