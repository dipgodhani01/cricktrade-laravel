// useEffect(() => {
//   if (players && players.length > 0) {
//     const pendingPlayers = players.filter((p) => p.status === "pending");
//     if (pendingPlayers.length > 0) {
//       const i = Math.floor(Math.random() * pendingPlayers.length);
//       setRandomPlayer(pendingPlayers[i]);
//       setCurrentBid(pendingPlayers[i]?.minimum_bid || 0);
//       setSelectedTeam(null);
//     } else {
//       setRandomPlayer(null);
//     }
//   }
// }, [players]);

// toast.success(
//   `${randomPlayer.player_name} has been sold to ${
//     selectedTeam.team_name
//   } for ₹${handleAmt(currentBid)}!`
// );
// 🎉 Show celebration

// useEffect(() => {
//   if (players && players.length > 0) {
//     const pendingPlayers = players.filter((p) => p.status === "pending");
//     if (pendingPlayers.length > 0) {
//       const i = Math.floor(Math.random() * pendingPlayers.length);

//       setRandomPlayer(pendingPlayers[i]);
//       setCurrentBid(pendingPlayers[i]?.minimum_bid || 0);
//       setSelectedTeam(null);
//       setCountdown(3);
//       setShowTimer(true);
//     } else {
//       setRandomPlayer(null);
//     }
//   }
// }, [players]);

// import { useNavigate, useParams } from "react-router-dom";
// import Loader from "../common/Loader";
// import { handleAmt } from "../../helper/helper";
// import { getAllTeams } from "../../redux/slice/teamSlice";
// import {
//   getAllPlayers,
//   soldPlayer,
//   unsoldPlayer,
// } from "../../redux/slice/playerSlice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAuctionById } from "../../redux/slice/auctionSlice";
// import { toast } from "react-toastify";

// function Auction() {
//   const [randomPlayer, setRandomPlayer] = useState(null);
//   const [currentBid, setCurrentBid] = useState(0);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const { auctionId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { teams, loading } = useSelector((state) => state.teams);
//   const { players } = useSelector((state) => state.players);
//   const { selectedAuction } = useSelector((state) => state.auctions);

//   useEffect(() => {
//     dispatch(getAllTeams(auctionId));
//     dispatch(getAllPlayers(auctionId));
//     dispatch(getAuctionById(auctionId));
//   }, [auctionId]);

//   useEffect(() => {
//     if (players && players.length > 0) {
//       const pendingPlayers = players.filter((p) => p.status === "pending");
//       if (pendingPlayers.length > 0) {
//         const i = Math.floor(Math.random() * pendingPlayers.length);

//         setRandomPlayer(pendingPlayers[i]);
//         setCurrentBid(pendingPlayers[i]?.minimum_bid || 0);
//         setSelectedTeam(null);
//       } else {
//         setRandomPlayer(null);
//       }
//     }
//   }, [players]);

//   const handleTeamClick = (team) => {
//     if (!selectedAuction || !randomPlayer) return;
//     const newBid = Number(currentBid) + Number(selectedAuction.bid_increment);
//     if (newBid > team.remember_balance) {
//       toast.warn("Low balance. Unable to place bid.");
//       return;
//     }
//     if (!selectedTeam) {
//       setSelectedTeam(team);
//       return;
//     }
//     if (selectedTeam?.id == team?.id) {
//       setCurrentBid(newBid);
//       setSelectedTeam(team);
//       return;
//     }
//     setSelectedTeam(team);
//     setCurrentBid(newBid);
//   };

//   const handleSold = () => {
//     if (!selectedTeam) {
//       toast.error("Please choose a team first!");
//       return;
//     }
//     const data = new FormData();
//     data.append("_method", "PUT");
//     data.append("auction_id", auctionId);
//     data.append("player_id", randomPlayer.id);
//     data.append("sold_team_id", selectedTeam.id);
//     data.append("final_bid", currentBid);

//     dispatch(soldPlayer(data));
//     toast.success(
//       `${randomPlayer.player_name} has been sold to ${
//         selectedTeam.team_name
//       } for ₹${handleAmt(currentBid)}!`
//     );
//   };
//   const handleUnsold = () => {
//     const data = new FormData();
//     data.append("_method", "PUT");
//     data.append("auction_id", auctionId);
//     data.append("player_id", randomPlayer.id);

//     dispatch(unsoldPlayer(data));
//     toast.info(`${randomPlayer.player_name} goes Unsold!`);
//   };

//   const handleResetBid = () => {
//     if (randomPlayer) {
//       setCurrentBid(randomPlayer.minimum_bid || 0);
//       setSelectedTeam(null);
//     }
//   };

//   if (!randomPlayer) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#200f21] via-[#382039] to-[#5a3d5c] text-white p-4 text-center">
//         <p className="text-2xl md:text-4xl font-medium md:block md:w-[70%]">
//           Looks like the player list is empty. Please add players to begin the
//           auction.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="min-h-screen w-full bg-black flex flex-col lg:flex-row gap-6 p-4">
//           <div className="w-full lg:w-[50%] text-white flex flex-col gap-4">
//             <div className="w-full h-[350px] sm:h-[450px] md:h-[600px] overflow-hidden rounded-lg">
//               <img
//                 src={randomPlayer?.player_logo}
//                 alt="Player"
//                 className="w-full h-full object-cover rounded-md"
//               />
//             </div>

//             <div className="p-4 bg-black">
//               <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
//                 Base Price:{" "}
//                 <span className="text-orange-500">
//                   {handleAmt(randomPlayer?.minimum_bid) || "0"}
//                 </span>
//               </p>
//             </div>

//             <div className="p-4 bg-black rounded-lg shadow-md">
//               <h2 className="text-2xl md:text-3xl font-medium mb-4 text-center">
//                 Player Details
//               </h2>
//               <div className="space-y-2">
//                 <p className="text-lg md:text-xl">
//                   Name :- {randomPlayer?.player_name || "N/A"}
//                 </p>
//                 <p className="text-lg md:text-xl">
//                   Sports category :- {randomPlayer?.category || "-"}
//                 </p>
//                 <p className="text-lg md:text-xl">
//                   Contact :- {"+91 " + randomPlayer?.phone || "-"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="w-full lg:w-[55%] text-white flex flex-col">
//             <div className="grid md:grid-cols-2 gap-4">
//               {teams && teams.length > 0 ? (
//                 teams.map((team, i) => {
//                   const isDisabled =
//                     Number(team.player_allow) === team.player_buy;
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => !isDisabled && handleTeamClick(team)}
//                       disabled={isDisabled}
//                       className={`py-1 px-4 rounded text-xl shadow text-center font-medium transition md:text-xl flex gap-4 items-center ${
//                         selectedTeam?._id === team._id
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-purple-700 hover:bg-purple-800"
//                       }`}
//                     >
//                       <div className="h-12 w-12 rounded-full overflow-hidden">
//                         <img src={team.team_logo} alt="Team Logo" />
//                       </div>
//                       <span>{team.team_name}</span>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <p className="col-span-full text-center text-lg">
//                   No Teams Available.
//                 </p>
//               )}
//             </div>
//             <div className="mt-10 gap-4 text-2xl font-medium text-center">
//               <p>
//                 Current Bid:{" "}
//                 <span className="text-green-500">{handleAmt(currentBid)}</span>
//               </p>
//               {selectedTeam && <p>Bid by: {selectedTeam.team_name}</p>}
//             </div>
//             <br />
//             <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
//               <button
//                 onClick={handleResetBid}
//                 className="py-2 px-8 bg-gray-600 hover:bg-gray-700 text-white rounded shadow transition"
//               >
//                 Reset Bid
//               </button>
//               <button
//                 className="py-2 px-8 bg-orange-600 hover:bg-orange-700 text-white rounded shadow transition"
//                 onClick={() => navigate(-1)}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={handleSold}
//                 className={`py-2 px-8 text-white bg-green-600 hover:bg-green-700 rounded shadow transition`}
//               >
//                 Sold
//               </button>
//               <button
//                 onClick={handleUnsold}
//                 className="py-2 px-8 bg-red-600 hover:bg-red-700 text-white rounded shadow transition"
//               >
//                 Unsold
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Auction;

// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const exportToExcel = (data, fileName) => {
//   const worksheet = XLSX.utils.json_to_sheet(data); // JSON → Sheet
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });

//   const dataBlob = new Blob([excelBuffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });

//   saveAs(dataBlob, `${fileName}.xlsx`);
// };

// auction before timer set
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Loader from "../common/Loader";
// import { handleAmt } from "../../helper/helper";
// import { getAllTeams } from "../../redux/slice/teamSlice";
// import {
//   getAllPlayers,
//   soldPlayer,
//   unsoldPlayer,
// } from "../../redux/slice/playerSlice";
// import { getAuctionById } from "../../redux/slice/auctionSlice";
// import PlayerCard from "./component/PlayerCard";
// import TeamButton from "./component/TeamButton";
// import AuctionActions from "./component/AuctionActions";

// function Auction() {
//   const [randomPlayer, setRandomPlayer] = useState(null);
//   const [currentBid, setCurrentBid] = useState(0);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const { auctionId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { teams, teamLoading } = useSelector((state) => state.teams);
//   const { players, playerLoading } = useSelector((state) => state.players);
//   const { selectedAuction, auctionLoading } = useSelector(
//     (state) => state.auctions
//   );

//   useEffect(() => {
//     dispatch(getAllTeams(auctionId));
//     dispatch(getAllPlayers(auctionId));
//     dispatch(getAuctionById(auctionId));
//   }, [auctionId]);

//   useEffect(() => {
//     const pendingPlayers = players?.filter((p) => p.status === "pending") || [];
//     if (pendingPlayers.length > 0) {
//       const randomIndex = Math.floor(Math.random() * pendingPlayers.length);
//       const player = pendingPlayers[randomIndex];
//       setRandomPlayer(player);
//       setCurrentBid(player?.minimum_bid || 0);
//       setSelectedTeam(null);
//     } else {
//       setRandomPlayer(null);
//     }
//   }, [players]);

//   const handleTeamClick = (team) => {
//     if (!selectedAuction || !randomPlayer) return;
//     const newBid = Number(currentBid) + Number(selectedAuction.bid_increment);
//     if (newBid > team.remember_balance) {
//       toast.warn("Low balance. Unable to place bid.");
//       return;
//     }
//     if (!selectedTeam || selectedTeam?.id !== team?.id) {
//       setSelectedTeam(team);
//       setCurrentBid(newBid);
//     } else {
//       setCurrentBid(newBid);
//     }
//   };

//   const handleSold = () => {
//     if (!selectedTeam) return toast.error("Please choose a team first!");

//     const data = new FormData();
//     data.append("_method", "PUT");
//     data.append("auction_id", auctionId);
//     data.append("player_id", randomPlayer.id);
//     data.append("sold_team_id", selectedTeam.id);
//     data.append("final_bid", currentBid);

//     dispatch(soldPlayer(data)).then(() => {
//       dispatch(getAllPlayers(auctionId));
//       dispatch(getAllTeams(auctionId));
//     });

//     toast.success(
//       `${randomPlayer.player_name} sold to ${
//         selectedTeam.team_name
//       } for ₹${handleAmt(currentBid)}!`
//     );
//   };

//   const handleUnsold = () => {
//     const data = new FormData();
//     data.append("_method", "PUT");
//     data.append("auction_id", auctionId);
//     data.append("player_id", randomPlayer.id);

//     dispatch(unsoldPlayer(data)).then(() => {
//       dispatch(getAllPlayers(auctionId));
//       dispatch(getAllTeams(auctionId));
//     });

//     toast.info(`${randomPlayer.player_name} goes Unsold!`);
//   };

//   const handleResetBid = () => {
//     setCurrentBid(randomPlayer?.minimum_bid || 0);
//     setSelectedTeam(null);
//   };

//   if (!randomPlayer && !teamLoading && !playerLoading && !auctionLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#200f21] via-[#382039] to-[#5a3d5c] text-white p-4 text-center">
//         <p className="text-2xl md:text-4xl font-medium md:block md:w-[70%]">
//           Looks like the player list is empty. Please add players to begin the
//           auction.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {playerLoading ? (
//         <Loader />
//       ) : (
//         <div className="min-h-screen w-full bg-black flex flex-col lg:flex-row gap-6 p-4">
//           <PlayerCard player={randomPlayer} />

//           <div className="w-full lg:w-[55%] text-white flex flex-col">
//             <div className="grid md:grid-cols-2 gap-4">
//               {teams?.length > 0 ? (
//                 teams.map((team, i) => {
//                   const isDisabled =
//                     Number(team.player_allow) === team.player_buy;
//                   return (
//                     <TeamButton
//                       key={i}
//                       team={team}
//                       selectedTeam={selectedTeam}
//                       onClick={() => !isDisabled && handleTeamClick(team)}
//                       disabled={isDisabled}
//                     />
//                   );
//                 })
//               ) : (
//                 <p className="col-span-full text-center text-lg">
//                   No Teams Available.
//                 </p>
//               )}
//             </div>

//             <div className="mt-10 gap-4 text-2xl font-medium text-center">
//               <p>
//                 Current Bid:{" "}
//                 <span className="text-green-500">{handleAmt(currentBid)}</span>
//               </p>
//               {selectedTeam && <p>Bid by: {selectedTeam.team_name}</p>}
//             </div>

//             <AuctionActions
//               onReset={handleResetBid}
//               onBack={() => navigate(-1)}
//               onSold={handleSold}
//               onUnsold={handleUnsold}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Auction;
