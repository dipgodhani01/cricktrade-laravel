import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllTeams } from "../../redux/slice/teamSlice";
import { getAuctionById } from "../../redux/slice/auctionSlice";

function Summary() {
  const { auctionId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading } = useSelector((state) => state.teams);
  const { selectedAuction } = useSelector((state) => state.auctions);
  console.log(selectedAuction);
  console.log(teams);

  useEffect(() => {
    dispatch(getAuctionById(auctionId));
    dispatch(getAllTeams(auctionId));
  }, [auctionId]);

  if (!selectedAuction) {
    <div>Data Not Available</div>;
  }

  return (
    <div className="container mx-auto w-full p-4">
      {/* Auction details */}
      <div className="flex justify-center">
        <div className="p-4">
          <img
            src={selectedAuction.auction_logo}
            alt="auction-logo"
            className=" h-[260px] lg:w-full md:w-[240px] w-[130px]"
          />
        </div>
        <div className="px-0 py-4 text-xl font-medium">
          <p>Auction : {selectedAuction.auction_name}</p>
          <p>Total Team : {teams.length}</p>
        </div>
      </div>
      {/* Team details */}
      <div>
        {!teams && !teams.length > 0 ? <div>Auction Summary Empty</div> : ""}
      </div>
    </div>
  );
}

export default Summary;
