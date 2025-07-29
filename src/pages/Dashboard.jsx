import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAuction, getUserAuctions } from "../redux/slice/auctionSlice";
import { useEffect } from "react";
import Loader from "../components/common/Loader";
import { auctionListTableHeader } from "../data/allMapingData";
import { formatDate, formatIndianNumber } from "../helper/helper";
import { MdDashboard, MdDelete, MdEdit } from "react-icons/md";
import { FaUser, FaUserGroup } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.user_id);
  const { auctions, loading } = useSelector((state) => state.auctions);

  function handleDeleteAuction(userId, auctionId) {
    dispatch(deleteAuction({ userId, auctionId }));
  }

  useEffect(() => {
    dispatch(getUserAuctions(userId));
  }, []);

  console.log("Auctions", auctions);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-medium">My Auction List</h2>
          <button
            className="bg-green-700 block text-white px-4 py-2 mt-4 rounded mx-auto"
            onClick={() => navigate("/create-auction")}
          >
            + Add Auction
          </button>
          <br />
          <div className="mt-4 overflow-x-auto table-responsive">
            {auctions && auctions.length > 0 ? (
              <table className="border-collapse w-full border mb-3 min-w-[1120px] border-black">
                <thead className="bg-gray-100">
                  <tr>
                    {auctionListTableHeader?.map((li, i) => {
                      return (
                        <th
                          key={i}
                          className="border border-gray-200 px-4 py-2 text-left"
                        >
                          {li}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {auctions.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 text-blue-800">
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              // onClick={() => editAuction(data._id)}
                              title="Edit Auction"
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              onClick={() =>
                                handleDeleteAuction(data.user_id, data.id)
                              }
                              title="Delete Auction"
                            >
                              <MdDelete size={20} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              // onClick={() => navigate(`players/${data._id}`)}
                              title="All Players"
                            >
                              <FaUser size={16} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              // onClick={() => navigate(`teams/${data._id}`)}
                              title="All Teams"
                            >
                              <FaUserGroup size={16} />
                            </button>
                            <button
                              className="bg-gray-100 hover:bg-gray-200 transition h-8 w-8 flex items-center justify-center rounded-full"
                              // onClick={() =>
                              //   navigate(`/auction-dashboard/${data._id}`)
                              // }
                              title="Auction Dashboard"
                            >
                              <MdDashboard size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <img
                            src={data?.auction_logo}
                            alt="logo"
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.auction_name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.sports_type}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {formatIndianNumber(data.point_perteam)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {formatIndianNumber(data.minimum_bid)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {formatIndianNumber(data.bid_increment)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {data.player_perteam}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {formatDate(data?.auction_date)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-red-600 text-xl md:text-2xl font-medium">
                No Auction Available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
