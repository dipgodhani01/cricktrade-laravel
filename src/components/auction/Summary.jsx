import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";
import Chakra from "../common/Chakra";
import SummaryHead from "./component/SummaryHead";
import PlayersAll from "../summary/PlayersAll";
import Tabs from "../common/Tabs";
import AuctionSummary from "../summary/AuctionSummary";

function Summary() {
  const [activeTab, setActiveTab] = useState(0);
  const { auctionId } = useParams();
  const dispatch = useDispatch();

  const { selectedAuction, auctionLoading } = useSelector(
    (state) => state.auctions
  );
  const { teams } = useSelector((state) => state.teams);

  const totalTeams = useMemo(() => teams?.length || 0, [teams]);

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId, dispatch]);

  const tabList = [{ label: "Auction Summary" }, { label: "Players List" }];
  return (
    <div className="bg-[#FAF4E1] min-h-screen">
      {auctionLoading ? (
        <Chakra center={true} />
      ) : (
        <SummaryHead
          logo={selectedAuction?.auction_logo}
          name={selectedAuction?.auction_name}
          totalTeams={totalTeams}
        />
      )}
      <Tabs tabs={tabList} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 && <AuctionSummary auctionId={auctionId} />}
      {activeTab === 1 && <PlayersAll auctionId={auctionId} />}
    </div>
  );
}

export default Summary;
