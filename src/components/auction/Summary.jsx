import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import Loader2 from "../common/Loader2";
import { summaryTableHeader } from "../../data/allMapingData";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { handleAmt } from "../../helper/helper";
import { tr } from "../../helper/style";
import Thead from "../common/Thead";

function Summary() {
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading: teamsLoading } = useSelector((state) => state.teams);
  const { selectedAuction, loading: auctionLoading } = useSelector(
    (state) => state.auctions
  );

  const totalTeams = useMemo(() => teams?.length || 0, [teams]);

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId, dispatch]);

  const isLoading = teamsLoading || auctionLoading;

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
        {teams?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <Thead data={summaryTableHeader} />
              <tbody>
                {teams.map((team, i) => (
                  <tr key={team.id} className="hover:bg-gray-50">
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
          </div>
        ) : (
          !isLoading && (
            <div className="p-8 text-center text-red-600 text-xl md:text-2xl font-medium">
              No Teams Available
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Summary;
