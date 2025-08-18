import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../redux/slice/playerSlice";
import SearchFilter from "../common/SearchFilter";
import PlayerTable from "../auction/component/PlayerTable";
import Chakra from "../common/Chakra";
import { notFound } from "../../helper/style";
import { filterPlayers } from "../../helper/helper";

function PlayersAll({ auctionId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { players, playerLoading } = useSelector((state) => state.players);
  const filteredPlayers = useMemo(
    () => filterPlayers(players, searchTerm),
    [players, searchTerm]
  );

  useEffect(() => {
    dispatch(getAllPlayers(auctionId));
  }, [dispatch]);

  return (
    <div className="container mx-auto w-full px-4">
      <div className="overflow-x-auto">
        <h2 className="text-center my-4 text-2xl font-medium text-[#A40000]">
          All Players
        </h2>

        {players?.length > 0 && !playerLoading && (
          <SearchFilter
            placeholder="Search Player..."
            value={searchTerm}
            handleChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {playerLoading ? (
          <Chakra center={true} />
        ) : filteredPlayers?.length > 0 ? (
          <PlayerTable filteredPlayers={filteredPlayers} />
        ) : !playerLoading ? (
          <div className={notFound}>No players available.</div>
        ) : null}
      </div>
    </div>
  );
}

export default PlayersAll;
